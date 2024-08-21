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
        $user = $jsonData['user'] ?? null;
        $position = $jsonData['position'] ?? null;
        $company = $jsonData['company'] ?? null;
        $date_from = $jsonData['date_from'] ?? null;
        $date_to = $jsonData['date_to'] ?? null;
        $city = $jsonData['city'] ?? null;
        $country = $jsonData['country'] ?? null;
        $description = $jsonData['description'] ?? null;
        $technologies = $jsonData['technologies'] ?? null;

        // Determine which SQL operation to perform
        if ($id && $position) {
            // Update existing record
            $sql = "UPDATE `cv-work-experience` SET `user` = ?, `position` = ?, `company` = ?, `date_from` = ?, `date_to` = ?, `city` = ?, `country` = ?, `description` = ?, `technologies` = ? WHERE `id` = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ssssssssss", $user, $position, $company, $date_from, $date_to, $city, $country, $description, $technologies, $id);
        } elseif ($id && ($position === null || $position === "")) {
            // Delete record
            $sql = "DELETE FROM `cv-work-experience` WHERE `id` = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $id);
        } else {
            // Insert new record
            $sql = "INSERT INTO `cv-work-experience` (`user`, `position`, `company`, `date_from`, `date_to`, `city`, `country`, `description`, `technologies`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "sssssssss", $user, $position, $company, $date_from, $date_to, $city, $country, $description, $technologies);
        }

        // Execute the statement and check if successful
        if (!mysqli_stmt_execute($stmt)) {
            $allSuccessful = false;
            $errors[] = "Error processing data for position $position: " . mysqli_error($conn);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    }

    // Final response based on the execution result
    if ($allSuccessful) {
        echo json_encode(["status" => "success", "message" => "All data processed successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Some data could not be processed", "errors" => $errors]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

// Close the database connection
mysqli_close($conn);
?>
