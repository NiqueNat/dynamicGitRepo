<?php
require_once "./includes/db_includes.php";

$results = [];
$insertedRows = 0;

$query = "INSERT INTO livewell_db (name, email, `meal plan`) VALUES (?, ?, ?)";

if ($stmt = mysqli_prepare($link, $query)) {
    mysqli_stmt_bind_param($stmt, 'sss', $_REQUEST["full_name"], $_REQUEST['email'], $_REQUEST['meal_plan']);
    mysqli_stmt_execute($stmt);
    $insertedRows = mysqli_stmt_affected_rows($stmt);

    if ($insertedRows > 0) {
        $results[] = [
            "insertedRows" => $insertedRows,
            "id" => mysqli_insert_id($link),
            "full_name" => $_REQUEST["full_name"]
        ];
    }
    echo json_encode($results);
    mysqli_stmt_close($stmt);
}

mysqli_close($link);
?>
