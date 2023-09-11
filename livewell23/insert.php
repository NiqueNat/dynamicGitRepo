<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    exit('Method Not Allowed');
}

error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once "./db_includes.php";

if (isset($_POST['full_name']) && isset($_POST['email']) && isset($_POST['meal_plan'])) {
    $query = "INSERT INTO livewell_db (full_name, email, meal_plan) VALUES (?, ?, ?)";

    if (!$stmt = mysqli_prepare($link, $query)) {
        die('Prepare failed: ' . mysqli_error($link));
    }

    mysqli_stmt_bind_param($stmt, 'sss', $_POST['full_name'], $_POST['email'], $_POST['meal_plan']);
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        // After the data is inserted, retrieve the counts of each meal plan
        $countQuery = "SELECT meal_plan, COUNT(*) AS count FROM livewell_db GROUP BY meal_plan";
        $countResult = mysqli_query($link, $countQuery);

        if (!$countResult) {
            die('Error: ' . mysqli_error($link));
        }

        $mealPlanData = [];

        while ($row = mysqli_fetch_assoc($countResult)) {
            $mealPlanData[] = [
                'meal_plan' => $row['meal_plan'],
                'count' => $row['count'],
            ];
        }

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
