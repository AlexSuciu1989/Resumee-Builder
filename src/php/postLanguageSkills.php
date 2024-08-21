<?php
// Headers for CORS and content-type
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

// Include database connection
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $language = file_get_contents('php://input');
    $jsonDataArray = json_decode($language, true);

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
        $language_type = $jsonData['language_type'];
        $language = $jsonData['language'];
        $listening = $jsonData['listening'];
        $reading = $jsonData['reading'];
        $writing = $jsonData['writing'];
        $spoken_production = $jsonData['spoken_production'];
        $spoken_interaction = $jsonData['spoken_interaction'];
        $description = $jsonData['description'];
        $technologies = $jsonData['technologies'];

        // Prepare the SQL statement
        if ($id && $language) {
            $sql = "UPDATE `cv-language-skills` SET `user` = ?, `language_type` = ?, `language` = ?, `listening` = ?, `reading` = ?, `writing` = ?, `spoken_production` = ?, `spoken_interaction` = ? WHERE `id` = ? ";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "sssssssss", $user, $language_type, $language, $listening, $reading, $writing, $spoken_production, $spoken_interaction, $id);
        } elseif ($id && ($language === null || $language === "")) {
            // Delete record
            $sql = "DELETE FROM `cv-language-skills` WHERE `id` = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $id);
        } else {
            $sql = "INSERT INTO `cv-language-skills` (`user`, `language_type`, `language`, `listening`, `reading`, `writing`, `spoken_production`, `spoken_interaction`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ssssssss", $user, $language_type, $language, $listening, $reading, $writing, $spoken_production, $spoken_interaction);
        }

        // Execute the statement and check if successful
        if (!mysqli_stmt_execute($stmt)) {
            $allSuccessful = false;
            $errors[] = "Error adding data for position $language: " . mysqli_error($conn);
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
