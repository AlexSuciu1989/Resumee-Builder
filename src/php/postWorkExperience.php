<?php
// Headers for CORS and content-type
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

// Include database connection
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $workExperiences = file_get_contents('php://input');
    $jsonDataArray = json_decode($workExperiences, true);

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
        $position = $jsonData['position'];
        $company = $jsonData['company'];
        $date_from = $jsonData['date_from'];
        $date_to = $jsonData['date_to'];
        $city = $jsonData['city'];
        $country = $jsonData['country'];
        $description = $jsonData['description'];
        $technologies = $jsonData['technologies'];

        // Prepare the SQL statement

        if ($id) {
            $sql = "UPDATE `cv-work-experience` SET `user` = ?, `position` = ?, `company` = ?, `date_from` = ?, `date_to` = ?, `city` = ?, `country` = ?, `description` = ?, `technologies` = ? WHERE `id` = ? ";
            $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "ssssssssss", $user, $position, $company, $date_from, $date_to, $city, $country, $description, $technologies, $id);
        } else {
            $sql = "INSERT INTO `cv-work-experience` (`user`, `position`, `company`, `date_from`, `date_to`, `city`, `country`, `description`, `technologies`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "sssssssss", $user, $position, $company, $date_from, $date_to, $city, $country, $description, $technologies);
        }

        // Execute the statement and check if successful
        if (!mysqli_stmt_execute($stmt)) {
            $allSuccessful = false;
            $errors[] = "Error adding data for position $position: " . mysqli_error($conn);
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
