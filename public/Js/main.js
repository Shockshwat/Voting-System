const cad1 = document.getElementById("cad1");
const cad2 = document.getElementById("cad2");
const countData = document.getElementById("countData");
const errorMessage = document.querySelector("#error_message");
const apiUrl = "http://localhost:5500/public/Data/Data.json";

let selected = null;

cad1.addEventListener("click", () => setActive(cad1, cad2, cad1.value));
cad2.addEventListener("click", () => setActive(cad2, cad1, cad2.value));
countData.addEventListener("click", sendData);

function setActive(active, inactive, value) {
	if (active.style.backgroundColor !== "green") {
		active.style.backgroundColor = "green";
		inactive.style.backgroundColor = "#8a8a8a38";
		selected = value;
	}
}

function sendData() {
	if (selected === null) {
		errorMessage.innerText = "Please click on one candidate";
	} else {
		errorMessage.innerText = "";
		console.log(selected);
		updateData(selected);
		selected = null;
	}
}

function updateData(data) {
	const [value1, value2] = data.split(",");
	cad1.style.backgroundColor = "#8a8a8a38";
	cad2.style.backgroundColor = "#8a8a8a38";
	cad1.value = value1;
	cad2.value = value2;
}

fetch(apiUrl)
	.then((response) => response.json())
	.then((data) => updateData(Object.values(data)[0]))
	.catch((err) => console.log("An error occurred.", err));
