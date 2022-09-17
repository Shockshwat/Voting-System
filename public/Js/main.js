cad1 = document.getElementById("cad1");
cad2 = document.getElementById("cad2");
cad1.addEventListener("click", active1);
cad2.addEventListener("click", active2);
document.getElementById("countData").addEventListener("click", senddata);
let selected = null;
function active1() {
	if (cad1.style.backgroundColor === "green") {
	} else {
		cad1.style.backgroundColor = "green";
		cad2.style.backgroundColor = "#8a8a8a38";
		selected = cad1.value;
	}
}
function active2() {
	if (cad2.style.backgroundColor === "green") {
	} else {
		cad2.style.backgroundColor = "green";
		cad1.style.backgroundColor = "#8a8a8a38";
		selected = cad2.value;
	}
}
function senddata() {
	console.log(selected);
}
