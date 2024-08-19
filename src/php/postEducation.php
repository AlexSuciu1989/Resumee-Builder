<?php
// Headers for CORS and content-type
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

// Include database connection
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $education = file_get_contents('php://input');
    $jsonDataArray = json_decode($education, true);

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
        $date_from = $jsonData['date_from'];
        $date_to = $jsonData['date_to'];
        $school_or_trainer = $jsonData['school_or_trainer'];
        $city = $jsonData['city'];
        $country = $jsonData['country'];
        $website = $jsonData['website'];
        $description = $jsonData['description'];

        if ($id) {
            $sql = "UPDATE `cv-education-and-training` SET `user` = ?, `title` = ?, `date_from` = ?, `date_to` = ?, `school_or_trainer` = ?, `city` = ?, `country` = ?, `website` = ?, `description` = ? WHERE `id` = ? ";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ssssssssss", $user, $title, $date_from, $date_to, $school_or_trainer, $city, $country, $website, $description, $id);
        } else {
            $sql = "INSERT INTO `cv-education-and-training` (`user`, `title`, `date_from`, `date_to`, `school_or_trainer`, `city`, `country`, `website`, `description`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "sssssssss", $user, $title, $date_from, $date_to, $school_or_trainer, $city, $country, $website, $description);
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
