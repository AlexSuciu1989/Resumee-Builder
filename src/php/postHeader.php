<?php
// Enable error reporting for debugging (remove or comment out in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Headers for CORS and content-type
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

// Include database connection
include 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $header = file_get_contents('php://input');
    $jsonData = json_decode($header, true);

    // Check if JSON data was successfully decoded
    if ($jsonData === null) {
        echo json_encode(["status" => "error", "message" => "Error decoding JSON data"]);
        exit;
    }

    // Extract variables from JSON data with default empty string
    $id = $jsonData['id'] ?? null;
    $user = $jsonData['user'] ?? '';
    $name = $jsonData['name'] ?? '';
    $home = $jsonData['home'] ?? '';
    $email = $jsonData['email'] ?? '';
    $phone = $jsonData['phone'] ?? '';
    $website = $jsonData['website'] ?? '';
    $whatsapp = $jsonData['whatsapp'] ?? '';
    $linkedin = $jsonData['linkedin'] ?? '';
    $gender = $jsonData['gender'] ?? '';
    $date_of_birth = $jsonData['date_of_birth'] ?? '';
    $nationality = $jsonData['nationality'] ?? '';
    $about_me = $jsonData['about_me'] ?? '';

    // Prepare SQL statement based on whether ID is provided
    if ($id) {
        $sql = "UPDATE `cv-header` SET `user` = ?, `name` = ?, `home` = ?, `email` = ?, `phone` = ?, `website` = ?, `whatsapp` = ?, `linkedin` = ?, `gender` = ?, `date_of_birth` = ?, `nationality` = ?, `about_me` = ? WHERE `id` = ?";
        $stmt = mysqli_prepare($conn, $sql);
        if ($stmt) {
            // Assuming 'id' is an integer. Use 'i' for integer types.
            mysqli_stmt_bind_param($stmt, "ssssssssssssi", $user, $name, $home, $email, $phone, $website, $whatsapp, $linkedin, $gender, $date_of_birth, $nationality, $about_me, $id);
        }
    } else {
        $sql = "INSERT INTO `cv-header` (`user`, `name`, `home`, `email`, `phone`, `website`, `whatsapp`, `linkedin`, `gender`, `date_of_birth`, `nationality`, `about_me`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "ssssssssssss", $user, $name, $home, $email, $phone, $website, $whatsapp, $linkedin, $gender, $date_of_birth, $nationality, $about_me);
        }
    }

    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "Error preparing statement: " . mysqli_error($conn)]);
        exit;
    }

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(["status" => "success", "message" => "Data processed successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error processing data: " . mysqli_error($conn)]);
    }

    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

mysqli_close($conn);
?>
