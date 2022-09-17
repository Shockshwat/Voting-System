document.getElementById("cad1").addEventListener("click", active);
document.getElementById("cad2").addEventListener("click", active);

console.log("here");
function active() {
	if (this.style.backgroundColor === "green") {
		this.style.backgroundColor = "#8a8a8a38";
		console.log("here");
	} else {
		this.style.backgroundColor = "green";
		console.log("also here");
	}
}
