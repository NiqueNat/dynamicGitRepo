<?php

$host = "localhost:3306";
$db = "myrna67_live_well";
$user = "myrna67_live_well";
$pass = "#6823zOey";

$link = mysqli_connect($host, $user, $pass, $db);

$db_response = [];
$db_response['success'] = 'not set';

if (!$link) {
    $db_response['success'] = false;
} else {
    $db_response['success'] = true;
}
// echo json_encode($db_response);
?>

