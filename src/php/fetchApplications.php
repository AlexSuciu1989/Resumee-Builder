<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Include database connection
include 'db-connect.php';

// Initialize the data array
$dataRetrieved = array(
    "cv-applications" => array()
);

// Check if 'user' parameter is set
if (isset($_GET['user'])) {
    $storedUsername = $_GET['user'];

    // Prepare and execute the query
    $sql = "SELECT * FROM `cv-applications` WHERE user = ? ORDER BY application_date DESC";
    $stmt = $conn->prepare($sql);
    
    // Check if the statement was prepared correctly
    if ($stmt) {
        $stmt->bind_param("s", $storedUsername);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $dataRetrieved["cv-applications"][] = $row;
            }
        }
        
        // Close statement
        $stmt->close();
    } else {
        // Handle errors if the statement couldn't be prepared
        echo json_encode(array("error" => "Failed to prepare SQL statement."));
        exit();
    }
}

// Close database connection
$conn->close();

// Output the data as JSON
echo json_encode($dataRetrieved);
?>
