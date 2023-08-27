<?php
require_once "./includes/db_includes.php";

// Used to store the results of the query
$results = [];
$insertedRows = 0;

try {
    if (!isset($_REQUEST['full_name']) || !isset($_REQUEST['email']) || !isset($_REQUEST['meal_plan'])) {
        throw new Exception('Required data missing i.e full-name, email, meal_plan');
    }

    // Insert the data into the database
    $query = "INSERT INTO livewell_db (name, email, `meal plan`) VALUES (?, ?, ?)";

    // Prepare the query
    if ($stmt = mysqli_prepare($link, $query)) {
        mysqli_stmt_bind_param($stmt, 'sss', $_REQUEST["full_name"], $_REQUEST['email'], $_REQUEST['meal_plan']);
        mysqli_stmt_execute($stmt);
        $insertedRows = mysqli_stmt_affected_rows($stmt);

        // If the query was successful, prepare the response data
        $response = [
            "success" => true,
            "message" => "Data inserted successfully",
            "insertedRows" => $insertedRows,
            "id" => mysqli_insert_id($link),
            "full_name" => $_REQUEST["full_name"],
            "email" => $_REQUEST["email"],
            "meal_plan" => $_REQUEST["meal_plan"]
        ];

        mysqli_stmt_close($stmt);
    } else {
        throw new Exception('Prepared statement did not insert records');
    }
} catch (Exception $error) {
    $response = [
        "success" => false,
        "error" => $error->getMessage()
    ];
}

// Close the connection
mysqli_close($link);

// Echo the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>



<!-- https://myrna67.web582.com/livewell_db/app/insert.php?full_name=Honey&email=hsmtih@gmail.com&meal%20plan=vegan -->