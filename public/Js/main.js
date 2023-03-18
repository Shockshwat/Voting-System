// Get DOM elements
const candidate1 = document.getElementById("candidate1");
const candidate2 = document.getElementById("candidate2");
const countDataBtn = document.getElementById("countData");
const errorMessage = document.querySelector("#error_message");

// Initialize variables
let selectedCandidate = null;

// Add event listeners
candidate1.addEventListener("click", () =>
	setActiveCandidate(candidate1, candidate2, candidate1.value)
);
candidate2.addEventListener("click", () =>
	setActiveCandidate(candidate2, candidate1, candidate2.value)
);
countDataBtn.addEventListener("click", sendData);

// Define helper function to set active candidate
function setActiveCandidate(active, inactive, value) {
	if (active.style.backgroundColor !== "green") {
		active.style.backgroundColor = "green";
		inactive.style.backgroundColor = "#8a8a8a38";
		selectedCandidate = value;
	}
}

// Define function to handle data submission
function sendData() {
	if (selectedCandidate === null) {
		errorMessage.innerText = "Please click on one candidate";
	} else {
		errorMessage.innerText = "";
		console.log(selectedCandidate);
		updateData(selectedCandidate);
		selectedCandidate = null;
	}
}

// Define function to update candidate data
function updateData(data) {
	const [value1, value2] = data.split(",");
	candidate1.style.backgroundColor = "#8a8a8a38";
	candidate2.style.backgroundColor = "#8a8a8a38";
	candidate1.value = value1.replace("[", "");
	candidate2.value = value2;
}

// Load data from API
const apiUrl = "http://localhost:5500/public/Data/Data.json";
fetch(apiUrl)
	.then((response) => response.json())
	.then((data) => updateData(Object.values(data)[0]))
	.catch((err) => console.log("An error occurred.", err));
