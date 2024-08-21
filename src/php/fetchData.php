<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Include database connection
include 'db-connect.php';

// Initialize the data array
$dataRetrieved = array(
    "cv-header" => array(),
    "cv-work-experience" => array()
);

// Check if 'user' parameter is set
if (isset($_GET['user'])) {
    $storedUsername = $_GET['user'];

    // Prepare and execute queries
    $sql1 = "SELECT * FROM `cv-header` WHERE user = ?";
    $sql2 = "SELECT * FROM `cv-work-experience` WHERE user = ? ORDER BY date_from DESC";
    $sql3 = "SELECT * FROM `cv-projects` WHERE user = ? ORDER BY date_from DESC";
    $sql4 = "SELECT * FROM `cv-language-skills` WHERE user = ?";
    $sql5 = "SELECT * FROM `cv-honours-and-awards` WHERE user = ? ORDER BY `date` DESC";
    $sql6 = "SELECT * FROM `cv-education-and-training` WHERE user = ? ORDER BY date_from DESC";
    $sql7 = "SELECT * FROM `cv-driving-license` WHERE user = ?";
    $sql8 = "SELECT * FROM `cv-digital-skills` WHERE user = ?";

    // Fetch data from cv-header
    $stmt1 = $conn->prepare($sql1);
    $stmt1->bind_param("s", $storedUsername);
    $stmt1->execute();
    $result1 = $stmt1->get_result();
    if ($result1->num_rows > 0) {
        while ($row = $result1->fetch_assoc()) {
            $dataRetrieved["cv-header"][] = $row;
        }
    }

    // Fetch data from cv-work-experience
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("s", $storedUsername);
    $stmt2->execute();
    $result2 = $stmt2->get_result();
    if ($result2->num_rows > 0) {
        while ($row = $result2->fetch_assoc()) {
            $dataRetrieved["cv-work-experience"][] = $row;
        }
    }

    // Fetch data from cv-projects
    $stmt3 = $conn->prepare($sql3);
    $stmt3->bind_param("s", $storedUsername);
    $stmt3->execute();
    $result3 = $stmt3->get_result();
    if ($result3->num_rows > 0) {
        while ($row = $result3->fetch_assoc()) {
            $dataRetrieved["cv-projects"][] = $row;
        }
    }

     // Fetch data from cv-language-skills
     $stmt4 = $conn->prepare($sql4);
     $stmt4->bind_param("s", $storedUsername);
     $stmt4->execute();
     $result4 = $stmt4->get_result();
     if ($result4->num_rows > 0) {
         while ($row = $result4->fetch_assoc()) {
             $dataRetrieved["cv-language-skills"][] = $row;
         }
     }   

     // Fetch data from cv-honours-and-awards
     $stmt5 = $conn->prepare($sql5);
     $stmt5->bind_param("s", $storedUsername);
     $stmt5->execute();
     $result5 = $stmt5->get_result();
     if ($result5->num_rows > 0) {
         while ($row = $result5->fetch_assoc()) {
             $dataRetrieved["cv-honours-and-awards"][] = $row;
         }
     } 
     
      // Fetch data from cv-education-and-training
      $stmt6 = $conn->prepare($sql6);
      $stmt6->bind_param("s", $storedUsername);
      $stmt6->execute();
      $result6 = $stmt6->get_result();
      if ($result6->num_rows > 0) {
          while ($row = $result6->fetch_assoc()) {
              $dataRetrieved["cv-education-and-training"][] = $row;
          }
      } 

      // Fetch data from cv-driving-license
      $stmt7 = $conn->prepare($sql7);
      $stmt7->bind_param("s", $storedUsername);
      $stmt7->execute();
      $result7 = $stmt7->get_result();
      if ($result7->num_rows > 0) {
          while ($row = $result7->fetch_assoc()) {
              $dataRetrieved["cv-driving-license"][] = $row;
          }
      } 
    
      // Fetch data from cv-digital-skills
      $stmt8 = $conn->prepare($sql8);
      $stmt8->bind_param("s", $storedUsername);
      $stmt8->execute();
      $result8 = $stmt8->get_result();
      if ($result8->num_rows > 0) {
          while ($row = $result8->fetch_assoc()) {
              $dataRetrieved["cv-digital-skills"][] = $row;
          }
      } 


    // Close statements
    $stmt1->close();
    $stmt2->close();
    $stmt3->close();
    $stmt4->close();
    $stmt5->close();
    $stmt6->close();
    $stmt7->close();
    $stmt8->close();
}

// Close database connection
$conn->close();

// Output the data as JSON
echo json_encode($dataRetrieved);
?>
