<?php

//include database connection
require_once 'db_connect.php';

//query all records from the database
$stmt = $link->prepare($link"SELECT, email, mealplan, timestamp FROM livewell_db ORDER BY timestamp DESC");

//execute query
mysqli_stmt_execute($stmt);

//get result
$result = mysqli_stmt_get_result($stmt);

//loop through the returned data
while ($row = mysqli_fetch_assoc($result)) {
   $results[] = $row;
}

//return json encoded array
echo json_encode($results);

//close connection
mysqli_close($link);

?>