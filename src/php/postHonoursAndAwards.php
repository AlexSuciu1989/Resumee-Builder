<?php
// Headers for CORS and content-type
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

// Include database connection
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $honours = file_get_contents('php://input');
    $jsonDataArray = json_decode($honours, true);

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
        $title = $jsonData['title'];
        $issuer = $jsonData['issuer'];
        $date = $jsonData['date'];
        $description = $jsonData['description'];

        if ($id && $title) {
            $sql = "UPDATE `cv-honours-and-awards` SET `user` = ?, `title` = ?, `issuer` = ?, `date` = ?, `description` = ? WHERE `id` = ? ";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ssssss", $user, $title, $issuer, $date, $description, $id);
        } elseif ($id && ($title === null || $title === "")) {
            // Delete record
            $sql = "DELETE FROM `cv-honours-and-awards` WHERE `id` = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $id);
        } else {
            $sql = "INSERT INTO `cv-honours-and-awards` (`user`, `title`, `issuer`, `date`, `description`) 
            VALUES (?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "sssss", $user, $title, $issuer, $date, $description);
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
