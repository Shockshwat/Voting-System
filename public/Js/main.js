cad1 = document.getElementById("cad1");
cad2 = document.getElementById("cad2");
cad1.addEventListener("click", active1);
cad2.addEventListener("click", active2);
document.getElementById("countData").addEventListener("click", senddata);

let selected = null;
fetch("http://localhost:5000/", { mode: "no-cors" }).then((data) => {
	console.log(data);
});

function active1() {
	if (cad1.style.backgroundColor != "green") {
		cad1.style.backgroundColor = "green";
		cad2.style.backgroundColor = "#8a8a8a38";
		selected = cad1.value;
	}
}

function active2() {
	if (cad2.style.backgroundColor != "green") {
		cad2.style.backgroundColor = "green";
		cad1.style.backgroundColor = "#8a8a8a38";
		selected = cad2.value;
	}
}

function senddata() {
	if (selected == null) {
		document.getElementById("error_message").innerText =
			"Please click on one candidate";
	} else {
		document.querySelector("#error_message").innerText = "";
		console.log(selected);
		update_data(selected);
		selected = null;
	}
}

function update_data(data) {
	//file.write(data) (in Documents folder) please put respective JS here
	// DATA will be the JSON.
	// cad1.value = data[i[0]];
	// cad2.value = data[i[1]];
	cad1.style.backgroundColor = "#8a8a8a38";
	cad2.style.backgroundColor = "#8a8a8a38";
	cad1.value = "ABC";
	cad2.value = "XYZ";
}
function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
