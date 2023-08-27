<?php
require_once "./includes/db_includes.php";

$results = [];

$query = "SELECT name, email, `meal plan`, timestamp FROM livewell_db";
$result = mysqli_query($link, $query);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $results[] = $row;
    }
    mysqli_free_result($result);
}

echo json_encode($results);

mysqli_close($link);
?>
