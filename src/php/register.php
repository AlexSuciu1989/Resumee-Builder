<?php
// Headers for CORS and content-type
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

// Include database connection
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $formData = file_get_contents('php://input');
    $jsonData = json_decode($formData, true);

    // Check if JSON data was successfully decoded
    if ($jsonData === null) {
        echo json_encode(["status" => "error", "message" => "Error decoding JSON data"]);
        exit;
    }

    // Extract variables from JSON data
    $acc = $jsonData['account'];
    $email = $jsonData['email'];
    $pass = $jsonData['password'];
    $phone = $jsonData['phone'];

    $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

    $sql = "SELECT * FROM `cv-login` WHERE user = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
        exit();
    }

    $stmt->bind_param("s", $acc);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Username already exists. Please choose a different one."]);
    } else {
        $sql = "INSERT INTO `cv-login` (user, email, password, phone) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
            exit();
        }

        $stmt->bind_param("ssss", $acc, $email, $hashedPassword, $phone);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New record created successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
        }
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
