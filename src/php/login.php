<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include the database connection file
include 'db-connect.php';

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Check if the data is received correctly
if (isset($data["account"]) && isset($data["password"])) {
    $account = $data["account"];
    $password = $data["password"];

    // Validate input
    if (empty($account) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit();
    }

    // Prepare the SQL statement
    $sql = "SELECT * FROM `cv-login` WHERE user = ?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "Failed to prepare the SQL statement."]);
        exit();
    }

    // Bind parameters and execute the statement
    $stmt->bind_param("s", $account);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Verify the hashed password
        if (password_verify($password, $row['password'])) {
            echo json_encode(["status" => "success", "message" => "Login successful."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Username not found."]);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
}
?>