<?php
require_once "./includes/db_includes.php";

$results = [];
$insertedRows = 0;


//INSERT INTO `livewell_db` (`livewellID`, `name`, `email`, `meal plan`, `timestamp`) VALUES (NULL, 'Shannon Curry', 'scurry@gmail.com', 'Keto', current_timestamp());

$query = "INSERT INTO livewell_db (name, email, meal plan) VALUES (?, ?, ?);"

if($stmt = mysqli_prepare($link, $query)) {
    mysqli_stmt_bind_param($stmt, 'sss', $_REQUEST["full_name"], $_REQUEST['email'], $_REQUEST['meal plan']);
    mysqli_stmt_execute($stmt);
    $insertedRows = mysqli_stmt_affected_rows($stmt);
   

    if($insertedRows > 0) {
        $results[] = [
            "insertedRows" =>$insertedRows,
            "id" => $link->insert_id,
            "full_name" => $_REQUEST["full_name"]
        ];

}
echo json_encode($results);
}

//https://myrna67.web582.com/livewell_db/app/insert.php?full_name=Honey&email=hsmtih@gmail.com&meal%20plan=vegan
?>