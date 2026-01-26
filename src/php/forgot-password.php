<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db-connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"])) {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit();
}

$email = $data["email"];

$sql = "SELECT user FROM `cv-login` WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "success",
        "message" => "If this email exists, a reset link has been sent."
    ]);
    exit();
}

$token = bin2hex(random_bytes(32));
$expires = date("Y-m-d H:i:s", strtotime("+1 hour"));

$update = $conn->prepare(
    "UPDATE `cv-login` SET reset_token=?, reset_expires=? WHERE email=?"
);
$update->bind_param("sss", $token, $expires, $email);
$update->execute();

$resetLink = "https://alexsuciu.ro/projects/jobrunner/reset-password?token=$token";

$subject = "Reset your Job-Runner password";
$message = "Click the link below to reset your password:\n\n$resetLink\n\nThis link expires in 1 hour.";
$headers = "From: no-reply@job-runner.com";

mail($email, $subject, $message, $headers);

echo json_encode([
    "status" => "success",
    "message" => "If this email exists, a reset link has been sent."
]);
