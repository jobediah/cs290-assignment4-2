<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
include 'password.php'
?>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8"/>
	<title>Video rental</title>
	<script src='file.js'></script>
	</head>
<body>

<?php
/* Most of the syntax was acquired from php.net, http://php.net/manual/en/mysqli.quickstart.php,
and class lectures. Some implementation concepts came stackoverflow. */
	
	//Connect to database
	$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "hansejod-db", $password, "hansejod-db");
	if($mysqli->connect_errno){
		echo "Failed to connect: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	} 
	else {
		echo "Connection successful!<br>";
	}
	
	$HTTPMethod = $_SERVER['REQUEST_METHOD'];

	if($HTTPMethod === 'POST'){
		//Insert values into database
		if(isset($_POST['addVideo'])){
			if(isset($_POST['name']) && isset($_POST['category']) && isset($_POST['length']) && !empty($_POST['name']) && !empty($_POST['category']) && !empty($_POST['length'])){
				$movieName = $_POST['name'];
				$movieCat = $_POST['category']; 
				$movieLength = $_POST['length'];
				$rented = false;
				
			/*if(!$mysqli->query("DROP TABLE IF EXISTS movieDatabase") || !$mysqli->query("CREATE TABLE movieDatabase(id INT NOT NULL, name VARCHAR(255) NOT NULL, category VARCHAR(255), length INT, rented BOOL NOT NULL)")){
				echo "Table creation failed: (".$mysqli->errno.") ". $mysqli->error;
			} Used this only once to set up database.*/
			
				if (!($stmt = $mysqli->prepare("INSERT INTO movieDatabase(name, category, length, rented) VALUES (?, ?, ?, ?)"))) {
  	  				echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
  	  			}

				$id = 1;
				if(!$stmt->bind_param("ssii", $movieName, $movieCat, $movieLength, $rented)) {
		    		echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
				}
				
				if (!$stmt->execute()) {
		    		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
				}
			
				$stmt->close();	
			}
			
			else{
				echo "Please enter values for all fields";
			}
		}

		elseif(isset($_POST['deleteAll'])){
			//Delete all rows of database
			if (!($stmt = $mysqli->prepare("DELETE FROM movieDatabase"))) {
				echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
			}
   
			if (!$stmt->execute()) {
				echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;     
			}
			
			$stmt->close();
		}
	
		elseif(isset($_POST['updateTrue'])){
			//Change rented value so that it is checked out.
			$iden = $_POST['updateTrue'];	
			$mysqli->query("Update movieDatabase Set rented = true Where id = $iden");
		}
		
		elseif(isset($_POST['updateFalse'])){
			//Change rented value so that it is available.
			$iden = $_POST['updateFalse'];	
			$mysqli->query("Update movieDatabase Set rented = false Where id = $iden");
		}
		
		elseif(isset($_POST['deleteVideo'])){
			//Remove selected video from database
			$id = $_POST['deleteVideo'];
			
			if (!($stmt = $mysqli->prepare("DELETE FROM movieDatabase WHERE id = $id"))){
				echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error . "<br>";
			}
    
			if (!($stmt->execute())) {
    			echo "Execute failed: (" . $stmt->errno . ") " . $stmt.error;
			}

			else {
				$stmt->execute();
			}
		}
	}
		
?>	
	<form action='main.php' method='post'>
			<fieldset>
			<legend>Enter your query here:</legend>
			<label>Video name:</label>
			<input type='text' name='name'><br>
			<label>Video category:</label>
			<input type='text' name='category'><br>
			<label>Video length (minutes):</label>
			<input type='number' name='length' min='1' max='340'><br>
			<input type='submit' name='addVideo' value='Add'>
			</fieldset>
			<p><input type="submit" name='deleteAll' value="Remove all videos" style="background-color:red"></p>
	</form>
	
		<select id="dropdown">
		</select>
		<input type="submit" value="Filter results" onclick="Javascript:filterButton()">
	
	<div id="table"></div>
	<div id="hidden_form1"></div>	
	<div id="hidden_form2"></div>
	<div id="hidden_form3"></div>	 	
</body>
</html>