<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db-connect.php';

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (
    isset($data["account"]) &&
    isset($data["currentPassword"]) &&
    isset($data["newPassword"])
) {
    $account = $data["account"];
    $currentPassword = $data["currentPassword"];
    $newPassword = $data["newPassword"];

    if (empty($account) || empty($currentPassword) || empty($newPassword)) {
        echo json_encode([
            "status" => "error",
            "message" => "All fields are required."
        ]);
        exit();
    }

    // Get user
    $sql = "SELECT password FROM `cv-login` WHERE user = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to prepare SQL statement."
        ]);
        exit();
    }

    $stmt->bind_param("s", $account);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode([
            "status" => "error",
            "message" => "User not found."
        ]);
        exit();
    }

    $row = $result->fetch_assoc();

    // Verify current password
    if (!password_verify($currentPassword, $row["password"])) {
        echo json_encode([
            "status" => "error",
            "message" => "Current password is incorrect."
        ]);
        exit();
    }

    // Hash new password
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Update password
    $updateSql = "UPDATE `cv-login` SET password = ? WHERE user = ?";
    $updateStmt = $conn->prepare($updateSql);

    if (!$updateStmt) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to prepare update statement."
        ]);
        exit();
    }

    $updateStmt->bind_param("ss", $hashedPassword, $account);

    if ($updateStmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Password changed successfully."
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to update password."
        ]);
    }

    $updateStmt->close();
    $stmt->close();
    $conn->close();

} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid input."
    ]);
}
?>
