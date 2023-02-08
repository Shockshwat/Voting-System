cad1 = document.getElementById("cad1");
cad2 = document.getElementById("cad2");
cad1.addEventListener("click", active1);
cad2.addEventListener("click", active2);
document.getElementById("countData").addEventListener("click", senddata);

let selected = null;
let i = 0;
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
	cad1.style.backgroundColor = "#8a8a8a38";
	cad2.style.backgroundColor = "#8a8a8a38";
	data = Object.values(data);
	edit_data = data[0].split(",");
	console.log(edit_data);
	console.log(edit_data[0]);
	console.log(edit_data[1]);
	// edit_data = data[0].split(",");
	// console.log(edit_data);
	// console.log(data[i]);
	// cad1.value = edit_data[0];
	// cad2.value = edit_data[1];
	i++;
}
fetch("http://localhost:5500/public/Data/Data.json")
	.then((response) => response.json())
	.then((data) => {
		data = Object.values(data);
	})
	.catch((err) => {
		console.log("An error occurred.", err);
	});
