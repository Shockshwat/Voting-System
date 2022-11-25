// Requiring module
const express = require("express");
const fs = require("fs");
// Creating express object
const app = express();

// Handling GET request
app.listen(5000, () => {
	console.log(`Server is up and running on 5000 ...`);
});

app.get("/", (req, res) => {
	let data = JSON.parse(fs.readFileSync("public\\Js\\Data.json"));
	res.send(data);
});
