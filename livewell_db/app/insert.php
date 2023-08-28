<?php
require_once "./includes/db_includes.php";

//used to store the results of the query
$results = [];
$insertedRows = 0;

//sql query copied from phpMyAdmin
//INSERT INTO `livewell_db` (`livewellID`, `name`, `email`, `meal plan`, `timestamp`) VALUES (NULL, 'Shannon Curry', 'scurry@gmail.com', 'Keto', current_timestamp());

try {
   if(!isset($_REQUEST['full_name']) || !isset($_REQUEST['email']) || !isset($_REQUEST['meal_plan']) ){
      throw new Exception('Required data missing i.e full-name, email, meal_plan');
    }

//insert the data into the database
$query = "INSERT INTO livewell_db (name, email, meal plan) VALUES (?, ?, ?)";

//prepare the query
if ($stmt = mysqli_prepare($link, $query)) {
    mysqli_stmt_bind_param($stmt, 'sss', $_REQUEST["full_name"], $_REQUEST['email'], $_REQUEST['meal_plan']);
    mysqli_stmt_execute($stmt);
    $insertedRows = mysqli_stmt_affected_rows($stmt);

    //if the query was successful, return the data
    if ($insertedRows > 0) {
        $results[] = [
            "insertedRows" => $insertedRows,
            "id" => mysqli_insert_id($link),
            "full_name" => $_REQUEST["full_name"]
        ];
    }else{
        throw new Exception('No rows were inserted');
    }

    
  
    mysqli_stmt_close($stmt);


}else{
    throw new Exception('Prepared statement did not insert records');
}




   } catch($Exception $error){
        echo json_encode(['error' => $error->getMessage()]);
    } finally{
            echo json_encode([
                "message" => $_REQUEST["full_name"],
                "email" => $_REQUEST["email"],
                "meal_plan" => $_REQUEST["meal_plan"]
            ]);
        }


close the connection
mysqli_close($link);
?>



<!-- https://myrna67.web582.com/livewell_db/app/insert.php?full_name=Honey&email=hsmtih@gmail.com&meal%20plan=vegan -->