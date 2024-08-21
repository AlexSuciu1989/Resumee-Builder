<?php
// Headers for CORS and content-type
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

// Include database connection
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $license = file_get_contents('php://input');
    $jsonDataArray = json_decode($license, true);

    // Check if JSON data was successfully decoded
    if ($jsonDataArray === null) {
        echo json_encode(["status" => "error", "message" => "Error decoding JSON data"]);
        exit;
    }

    $allSuccessful = true;  // Flag to track if all inserts are successful
    $errors = [];  // Array to collect any errors

    foreach ($jsonDataArray as $jsonData) {
        // Extract variables from JSON data
        $id = $jsonData['id'] ?? null;
        $user = $jsonData['user'];
        $vehicle_type = $jsonData['vehicle_type'];
        $license = $jsonData['license'];

        if ($id && $license) {
            $sql = "UPDATE `cv-driving-license` SET `user` = ?, `vehicle_type` = ?, `license` = ? WHERE `id` = ? "; 
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ssss", $user, $vehicle_type, $license, $id);
        } elseif ($id && ($license === null || $license === "")) {
            // Delete record
            $sql = "DELETE FROM `cv-driving-license` WHERE `id` = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $id);
        } else {
            $sql = "INSERT INTO `cv-driving-license` (`user`, `vehicle_type`, `license`) 
            VALUES (?, ?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "sss", $user, $vehicle_type, $license);
        }

        // Execute the statement and check if successful
        if (!mysqli_stmt_execute($stmt)) {
            $allSuccessful = false;
            $errors[] = "Error adding data for position $title: " . mysqli_error($conn);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    }

    if ($allSuccessful) {
        echo json_encode(["status" => "success", "message" => "All data added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Some data could not be added", "errors" => $errors]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

// Close the database connection
mysqli_close($conn);
?>
