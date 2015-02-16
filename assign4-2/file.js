/* General syntax was acquired from class lectures. Some implementation concepts 
came stackoverflow. */

window.onload = function(){
	serverRequest('All');
};


var serverRequest = function(filter){
   	//Request to server for database
   	var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        console.log("Success");
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                console.log(data);
                generateTable(data, filter);   
            }
            
            else { console.log("Sorry, something didn't work")}
        }
            
        else {console.log("Not ready");}

    }

    httpRequest.open('GET', 'http://web.engr.oregonstate.edu/~hansejod/data.php', true);
    httpRequest.send();  
};


var generateTable = function(data, filterResults) {
    
    //Call to function to get categories
	getFilterArray(data);
	
	
	//Setup dropdown menu with current categories
	var select = document.getElementById("dropdown");
  
  	//Remove old list
	while (select.firstChild){
  		select.removeChild(select.firstChild);
	}
  	
  	option = document.createElement('option');
  	option.setAttribute('value', "All");
  	text = document.createTextNode('All');
  	option.appendChild(text);
  	select.appendChild(option);
	
	for(var j = 0; j < filter.length; j++){
		option = document.createElement('option');
  		option.setAttribute('value', filter[j]);
  		text = document.createTextNode(filter[j]);
  		option.appendChild(text);
  		select.appendChild(option);
	}
	
    
    //Setup table with database information, sorted by categories
    var div = document.getElementById("table");
    
    //Remove old list
	while (div.firstChild){
  		div.removeChild(div.firstChild);
	}
    
    var paragraph = document.createElement("p");
	var text_header = document.createTextNode("Movies in database:");
	paragraph.appendChild(text_header);
	div.appendChild(paragraph);
	
	var table = document.createElement("table");
	table.setAttribute("border", "2", "2");
	var tHead = document.createElement("thead");
	var tRow = document.createElement("tr");
	
	var tH1 = document.createElement("th");
	var tHeadText1 = document.createTextNode("NAME");
	tH1.appendChild(tHeadText1);
	
	var tH2 = document.createElement("th");
	var tHeadText2 = document.createTextNode("CATEGORY");
	tH2.appendChild(tHeadText2);
	
	var tH3 = document.createElement("th");
	var tHeadText3 = document.createTextNode("LENGTH");
	tH3.appendChild(tHeadText3);
	
	var tH4 = document.createElement("th");
	var tHeadText4 = document.createTextNode("STATUS");
	tH4.appendChild(tHeadText4);
	
	tRow.appendChild(tH1);
	tRow.appendChild(tH2);
	tRow.appendChild(tH3);
	tRow.appendChild(tH4);
	
	tHead.appendChild(tRow);
	
	var tBody = document.createElement("tbody");
	
	// creating all cells of table
  	for (var i = 0; i < data.length; i++) {	
    	if(filterResults === data[i].category || filterResults === 'All'){
			var mainRows = document.createElement("tr");
 
			var cell = document.createElement("td");
			var cellText = document.createTextNode(data[i].name);
			cell.appendChild(cellText);
			mainRows.appendChild(cell);
	
			var cell1 = document.createElement("td");
			var cellText1 = document.createTextNode(data[i].category);
			cell1.appendChild(cellText1);
			mainRows.appendChild(cell1);
	  
			var cell2 = document.createElement("td");
			var cellText2 = document.createTextNode(data[i].length);
			cell2.appendChild(cellText2);
			mainRows.appendChild(cell2);
	  
			var cell3 = document.createElement("td");
			if(data[i].rented === 0){
				cell3.innerHTML = "<input type='button' name='"+data[i].id+"' value='available' onclick='updateTrue(this.name)'>";
		}
		else{
			cell3.innerHTML = "<input type='button' name='"+data[i].id+"' value='checked Out' onclick='updateFalse(this.name)'>";
		}
		mainRows.appendChild(cell3);
		
		var cell4 = document.createElement("td");
		cell4.innerHTML = "<input type='button' name='"+data[i].id+"' value='Delete' onclick='deleteMovie(this.name)'>";
		mainRows.appendChild(cell4);
 
		tBody.appendChild(mainRows);
  }
	
	table.appendChild(tHead);
	table.appendChild(tBody);
	div.appendChild(table);
	}
};


var updateTrue = function(id) {
	var form, newInput;
  	form = document.createElement('form');
  	form.action = 'http://web.engr.oregonstate.edu/~hansejod/main.php';
  	form.method = 'post';
  
  	newInput = document.createElement('input');
  	newInput.type = 'hidden';
  	newInput.name = 'updateTrue';
  	newInput.value = id;
  
  	form.appendChild(newInput);
  	document.getElementById('hidden_form1').appendChild(form);
  
  	form.submit();
};


var updateFalse = function(id) {
	var form, newInput;
  	form = document.createElement('form');
  	form.action = 'http://web.engr.oregonstate.edu/~hansejod/main.php';
  	form.method = 'post';
  
  	newInput = document.createElement('input');
  	newInput.type = 'hidden';
  	newInput.name = 'updateFalse';
  	newInput.value = id;
  	
  	form.appendChild(newInput);
  	document.getElementById('hidden_form2').appendChild(form);
  
  	form.submit();
};


var deleteMovie = function(id){
	var form, newInput;
  	form = document.createElement('form');
  	form.action = 'http://web.engr.oregonstate.edu/~hansejod/main.php';
  	form.method = 'post';
  
  	newInput = document.createElement('input');
  	newInput.type = 'hidden';
  	newInput.name = 'deleteVideo';
  	newInput.value = id;
  	 
  	form.appendChild(newInput);
  	document.getElementById('hidden_form3').appendChild(form);
  
  	form.submit();
};


var filterButton = function(){
	var e = document.getElementById("dropdown");
	var someVar = e.options[e.selectedIndex].value;
	console.log(someVar);
	filterResults = someVar;
	serverRequest(someVar);
};


var filter = [];
var contains = function(v) {
    for(var i = 0; i < filter.length; i++) {
        if(filter[i] === v) return true;
    }
    return false;
};


var getFilterArray = function(data){
	for(var i = 0; i < data.length; i++){
		if(!contains(data[i].category)){
			filter.push(data[i].category);
		}
	}
};


