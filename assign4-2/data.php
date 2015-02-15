<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
include 'password.php'
?>
<?php
/* General syntax was acquired from class lectures, php.net, and w3schools. 
Some implementation concepts came from the class discusion board.*/ 
	
//Connect to database
$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "hansejod-db", $password, "hansejod-db");

			
//if(!$stmt = $mysqli->prepare("SELECT * FROM store_inventory ORDER BY id");
//$stmt->execute();
//$res = $stmt->get_result();
//$row = $res->fetch_assoc();
//$names = $row['name'];

//$res = $stmt->get_result();
//$row = $res->fetch_assoc();


if (!($stmt = $mysqli->prepare("SELECT * FROM movieDatabase ORDER BY id"))) {
	echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error . "<br>";
}
  
//if (!($stmt->bind_param("s", $category))) {
//    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
//}
    
if (!($stmt->execute())) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt.error;
}

else {
	$stmt->execute();
}

$res = $stmt->get_result();
$row = $res->fetch_assoc();


$results = array();
while ($row) {
	array_push($results, $row);
    $row = $res->fetch_assoc();
}
  //EXPLICIT CLOSE RECOMMENDED
$stmt->close();


echo json_encode($results);

//printf("id = %s %s (%s)\n", $row['id'], $row['name'], gettype($row['id']));

?>	