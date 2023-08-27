<?php
require_once "./includes/db_includes.php";
//used to store the results of the query
$results = [];
//insert the data into the database
$query = "SELECT name, email, `meal plan`, timestamp FROM livewell_db";
$result = mysqli_query($link, $query);

//if the query was successful, return the data
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $results[] = $row;
    }
    //free the result set
    mysqli_free_result($result);
}
//close the connection

echo json_encode($results);

mysqli_close($link);
?>
