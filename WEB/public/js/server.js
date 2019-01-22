const express = require("express");
const pug = require('pug');


const app = express();

const server = app.listen(7000, () => {
	var port = server.address().port;
	console.log("express running -> PORT %s", port)
})

app.use(express.static('views'));
app.use(express.static('public'));

var days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
var months = ["janvier", "février", "mars", "avril", "mail", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
var d = new Date();
var hour = (d.getHours()<10?'0':'') + d.getHours();
var min = (d.getMinutes()<10?'0':'') + d.getMinutes();
var date = (d.getDate()<10?'0':'') + d.getDate();
var month = months[d.getMonth()];
var year = d.getFullYear();
var weekday = days[d.getDay()]; // getDay: 0 - 6
var date = [year, month, weekday, date, hour, min];


app.get("/", (req, res) => {
	
	res.render("paud", {
		date: date
	});
})

app.set("view engine", "pug");
