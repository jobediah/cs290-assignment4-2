window.onload = function(){
	serverRequest('All');
};


var serverRequest = function(filter){
   	//Request to server for list
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
    var div = document.getElementById("table");
	
	//Remove old list
	while (div.firstChild){
  	div.removeChild(div.firstChild);
	}
	
	select = document.createElement('select');
  	select.setAttribute('id', 'filter');
  	select.setAttribute('onchange', 'filter()');
  
  	option = document.createElement('option');
  	text = document.createTextNode('--');
  	option.appendChild(text);
  	select.appendChild(option);
  
  	option = document.createElement('option');
  	option.setAttribute('value', "All");
  	text = document.createTextNode('All');
  	option.appendChild(text);
  	select.appendChild(option);
  	div.appendChild(select);
	
	var button = document.createElement("button");
	button.setAttribute('name', );
	div.appendChild(button);
    
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
	
	// creating all cells
  	for (var i = 0; i < data.length; i++) {
    // creates a table row
    	
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
		console.log(data[i].rented);
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
 
		// add the row to the end of the table body
		tBody.appendChild(mainRows);
  }
	
	table.appendChild(tHead);
	table.appendChild(tBody);
	div.appendChild(table);
	}
};

var updateTrue = function(id) {
	var theForm, newInput1;
  	// Start by creating a <form>
  	theForm = document.createElement('form');
  	theForm.action = 'http://web.engr.oregonstate.edu/~hansejod/main.php';
  	theForm.method = 'post';
  	// Next create the <input>s in the form and give them names and values
  	newInput1 = document.createElement('input');
  	newInput1.type = 'hidden';
  	newInput1.name = 'updateTrue';
  	newInput1.value = id;
  	// Now put everything together...
  	theForm.appendChild(newInput1);
  	// ...and it to the DOM...
  	document.getElementById('hidden_form2').appendChild(theForm);
  	// ...and submit it
  	theForm.submit();

};

var updateFalse = function(id) {
	var theForm, newInput1;
  	// Start by creating a <form>
  	theForm = document.createElement('form');
  	theForm.action = 'http://web.engr.oregonstate.edu/~hansejod/main.php';
  	theForm.method = 'post';
  	// Next create the <input>s in the form and give them names and values
  	newInput1 = document.createElement('input');
  	newInput1.type = 'hidden';
  	newInput1.name = 'updateFalse';
  	newInput1.value = id;
  	// Now put everything together...
  	theForm.appendChild(newInput1);
  	// ...and it to the DOM...
  	document.getElementById('hidden_form3').appendChild(theForm);
  	// ...and submit it
  	theForm.submit();

};

var deleteMovie = function(id){
		var theForm, newInput1;
  	// Start by creating a <form>
  	theForm = document.createElement('form');
  	theForm.action = 'http://web.engr.oregonstate.edu/~hansejod/main.php';
  	theForm.method = 'post';
  	// Next create the <input>s in the form and give them names and values
  	newInput1 = document.createElement('input');
  	newInput1.type = 'hidden';
  	newInput1.name = 'deleteVideo';
  	newInput1.value = id;
  	// Now put everything together...
  	theForm.appendChild(newInput1);
  	// ...and it to the DOM...
  	document.getElementById('hidden_form_container').appendChild(theForm);
  	// ...and submit it
  	theForm.submit();
};

var getFilter = function(category){
	serverRequest(category);
};
