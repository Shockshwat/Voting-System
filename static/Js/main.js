cad1 = document.getElementById("cad1");
cad2 = document.getElementById("cad2");
postval = document.getElementById("postVal");
cad1.addEventListener("click", active1);
cad2.addEventListener("click", active2);
document.getElementById("countData").addEventListener("click", senddata);
let Reqdata;
let selected = null;
let i = 0;
function active1() {
  if (cad1.style.backgroundColor != "green") {
    cad1.style.backgroundColor = "green";
    cad2.style.backgroundColor = "#8a8a8a38";
    selected = cad1;
  }
}

function active2() {
  if (cad2.style.backgroundColor != "green") {
    cad2.style.backgroundColor = "green";
    cad1.style.backgroundColor = "#8a8a8a38";
    selected = cad2;
  }
}

function senddata() {
  if (selected == null) {
    document.getElementById("error_message").innerText =
      "Please click on one candidate";
  } else {
    document.querySelector("#error_message").innerText = "";
    cad1.style.backgroundColor = "#8a8a8a38";
    cad2.style.backgroundColor = "#8a8a8a38";
    if (selected === cad1) {
      Reqdata[i - 1].candidates[0].votes += 1;
    }
    if (selected === cad2) {
      Reqdata[i - 1].candidates[1].votes += 1;
    }
    update_values();
    selected = null;
  }
}
function update_values() {
  if (i <= Reqdata.length - 1) {
    obj = Reqdata[i];
    postval.innerHTML = obj.post; // Get the post value
    cad1.value = obj.candidates[0].name;
    cad2.value = obj.candidates[1].name;
    i = i + 1;
  } else {
    postval.innerHTML = "Voting Completed! Thank you for voting";
    cad1.remove();
    cad2.remove();

    document.getElementById("countData").style.display = "none";
    fetch("http://127.0.0.1:8000/updatejson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Reqdata),
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
}
fetch("http://127.0.0.1:8000/getjson")
  .then((response) => response.json())
  .then((data) => {
    Reqdata = data;
    update_values();
  });
