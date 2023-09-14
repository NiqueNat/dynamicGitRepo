<?php

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    exit('Method Not Allowed');
}

// Allow requests from any origin
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once "./db_includes.php";

// Check if the data from the form was submitted
if (isset($_POST['full_name']) && isset($_POST['email']) && isset($_POST['meal_plan'])) {
    $query = "INSERT INTO livewell_db (full_name, email, meal_plan) VALUES (?, ?, ?)";

    if (!$stmt = mysqli_prepare($link, $query)) {
        die('Prepare failed: ' . mysqli_error($link));
    }

    // Bind the data to the statement, connecting the question marks in the query to the variables in this file
    mysqli_stmt_bind_param($stmt, 'sss', $_POST['full_name'], $_POST['email'], $_POST['meal_plan']);
    $result = mysqli_stmt_execute($stmt);

    // Check if the query executed successfully
    if ($result) {
        // After the data is inserted, retrieve the counts of each meal plan
        $countQuery = "SELECT meal_plan, COUNT(*) AS count FROM livewell_db GROUP BY meal_plan";
        $countResult = mysqli_query($link, $countQuery);

        if (!$countResult) {
            die('Error: ' . mysqli_error($link));
        }
//        $countResult = mysqli_stmt_get_result($stmt);
        $mealPlanData = [];

        while ($row = mysqli_fetch_assoc($countResult)) {
            $mealPlanData[] = [
                'meal_plan' => $row['meal_plan'],
                'count' => $row['count'],
            ];
        }

        // Free the result set-All associated result memory is automatically freed at the end of the script's execution. Parameters ¶. result. The result resource that is being evaluated. This result comes from a call to mysqli_query().
        mysqli_free_result($countResult);

        $response = [
            "success" => true,
            "message" => "Data inserted successfully",
            "mealPlanData" => $mealPlanData,
        ];
    } else {
        die('Error: ' . mysqli_stmt_error($stmt));
    }

    mysqli_stmt_close($stmt);
} else {
    $response = [
        "success" => false,
        "error" => "Required data missing (full_name, email, meal_plan)",
    ];
}

mysqli_close($link);

// Set Content-Type header to indicate JSON response
header('Content-Type: application/json');

// Echo the response as JSON
echo json_encode($response);
?>


<!-- resources
https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=0CAIQw7AJahcKEwio-N-zqKmBAxUAAAAAHQAAAAAQAg&url=https%3A%2F%2Fwww.php.net%2Fmanual%2Fen%2Ffunction.mysql-free-result.php&psig=AOvVaw2WXGzd25m52Gu3mi9SyPAD&ust=1694753872420910&opi=89978449 

https://stackoverflow.com/questions/20620300/http-content-type-header-and-json-->