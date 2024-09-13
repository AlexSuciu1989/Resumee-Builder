<?php
// Headers for CORS and content-type
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Include database connection
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    // Preflight request for CORS
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $applications = file_get_contents('php://input');
    $jsonDataArray = json_decode($applications, true);

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
        $application_date = $jsonData['application_date'] ?? null;
        $company = $jsonData['company'] ?? null;
        $job_title = $jsonData['job_title'] ?? null;
        $details = $jsonData['details'] ?? null;
        $contact = $jsonData['contact'] ?? null;
        $status = $jsonData['status'] ?? null;

        // Determine which SQL operation to perform
        if ($id && $company) {
            // Update existing record
            $sql = "UPDATE `cv-applications` SET `user` = ?, `application_date` = ?, `company` = ?, `job_title` = ?, `details` = ?, `contact` = ?, `status` = ? WHERE `id` = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ssssssss", $user, $application_date, $company, $job_title, $details, $contact, $status, $id);
        } elseif ($id && ($company === null || $company === "")) {
            // Delete record
            $sql = "DELETE FROM `cv-applications` WHERE `id` = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $id);
        } else {
            // Insert new record
            $sql = "INSERT INTO `cv-applications` (`user`, `application_date`, `company`, `job_title`, `details`, `contact`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "sssssss", $user, $application_date, $company, $job_title, $details, $contact, $status);
        }

        // Execute the statement and check if successful
        if (!mysqli_stmt_execute($stmt)) {
            $allSuccessful = false;
            $errors[] = "Error processing data for ID $id: " . mysqli_error($conn);
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
