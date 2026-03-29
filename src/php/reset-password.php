<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db-connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["token"], $data["password"])) {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit();
}

$token = $data["token"];
$newPassword = $data["password"];

$sql = "SELECT user FROM `cv-login`
        WHERE reset_token = ? AND reset_expires > NOW()";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid or expired token"
    ]);
    exit();
}

$hashed = password_hash($newPassword, PASSWORD_DEFAULT);

$update = $conn->prepare(
    "UPDATE `cv-login`
     SET password=?, reset_token=NULL, reset_expires=NULL
     WHERE reset_token=?"
);
$update->bind_param("ss", $hashed, $token);
$update->execute();

echo json_encode([
    "status" => "success",
    "message" => "Password updated"
]);
