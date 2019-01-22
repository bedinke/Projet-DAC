const express = require("express");
const pug = require('pug');
const mysql = require('mysql');
const request = require("request");
const bodyParser = require('body-parser');
const apiKey = '3c4695e3905db99d489c082963dca88c';
const app = express();

/*const server = app.listen(7000, () => {
  var port = server.address().port;
  console.log("express running -> PORT %s", port)
})*/


const http = require('http').Server(app);
const io = require('socket.io')(http);
//const io = require('socket.io').listen(app);


http.listen(7000, () => {
  var port = http.address().port;
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


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'paud'
});

var prenom = '';
var ville = '';
var pays = '';
var plante = '';
var suivi_ventilation = '';
var suivi_chauffage ='';
var suivi_arrosage = '';
var suivi_temperature ='';
var suivi_humidite = '';
var suivi_luminosite = '';
var suivi_temps = '';
var dernier_chauffage = '';
var dernier_chauffage_h = '';
var dernier_chauffage_min = '';
var dernier_arrosage = '';
var dernier_arrosage_h = '';
var dernier_arrosage_min = '';
var derniere_ventilation = '';
var derniere_ventilation_h = '';
var derniere_ventilation_min = '';
var nb_jours_plante = '';

var plante_exposition = '';
var plante_arrosage = '';
var plante_terreau = '';
var my_weather = '';

connection.connect(function(err) {
	if (err) throw err;
	console.log("You are now connected...");
  connection.query('SELECT * FROM user WHERE id=1', function(err, results) {
    if (err) throw err
    prenom = results[0]["prenom"].charAt(0).toUpperCase() + results[0]["prenom"].substr(1);
    //nom = results[0]["nom"];
    ville = results[0]["ville"].charAt(0).toUpperCase() + results[0]["ville"].substr(1);
    pays = results[0]["pays"].charAt(0).toUpperCase() + results[0]["pays"].substr(1);
    plante = results[0]["plante"].charAt(0).toUpperCase() + results[0]["plante"].substr(1);
    suivi_ventilation = results[0]["suivi_ventilation"].split(";");
    suivi_ventilation = suivi_ventilation[suivi_ventilation.length-2]; // dernier elem
    
    derniere_ventilation = Math.abs(new Date() - new Date(suivi_ventilation)); //retourne ms
    derniere_ventilation_h = Math.floor((derniere_ventilation/1000/60/60));
    derniere_ventilation_min = Math.floor((derniere_ventilation/1000/60)) - derniere_ventilation_h*60;
    if(derniere_ventilation_h == 0 || derniere_ventilation_h.length == 0) {
      derniere_ventilation = derniere_ventilation_min + "min";
    } else {
      derniere_ventilation = derniere_ventilation_h + "h " + derniere_ventilation_min + "min";
    }

    suivi_chauffage = results[0]["suivi_chauffage"].split(";");
    suivi_chauffage = suivi_chauffage[suivi_chauffage.length-2]; // dernier elem
    dernier_chauffage = Math.abs(new Date() - new Date(suivi_chauffage)); //retourne ms
    dernier_chauffage_h = Math.floor((dernier_chauffage/1000/60/60));
    dernier_chauffage_min = Math.floor((dernier_chauffage/1000/60)) - dernier_chauffage_h*60;
    if(dernier_chauffage_h == 0 || dernier_chauffage_h.length == 0) {
      dernier_chauffage = dernier_chauffage_min + "min";
    } else {
      dernier_chauffage = dernier_chauffage_h + "h " + dernier_chauffage_min + "min";
    }

    suivi_arrosage = results[0]["suivi_arrosage"].split(";");
    suivi_arrosage = suivi_arrosage[suivi_arrosage.length-2];
    dernier_arrosage = Math.abs(new Date() - new Date(suivi_arrosage)); //retourne ms
    dernier_arrosage_h = Math.floor((dernier_arrosage/1000/60/60));
    dernier_arrosage_min = Math.floor((dernier_arrosage/1000/60)) - dernier_arrosage_h*60;
    if(dernier_arrosage_h == 0 || dernier_arrosage_h.length == 0) {
      dernier_arrosage = dernier_arrosage_min + "min";
    } else {
      dernier_arrosage = dernier_arrosage_h + "h " + dernier_arrosage_min + "min";
    }

    suivi_temperature = results[0]["suivi_temperature"].split(";");
    suivi_temperature = suivi_temperature[suivi_temperature.length-2];
    /*suivi_humidite = results[0]["suivi_humidite"];
    suivi_temps = results[0]["suivi_arrosage"];*/

    var date_ajout_plante = results[0]["date_ajout_plante"];
    nb_jours_plante = Math.abs(new Date() - new Date(date_ajout_plante))
    nb_jours_plante = Math.floor(nb_jours_plante/1000/60/60/24);

    suivi_luminosite = results[0]["suivi_luminosite"].split(";");
    suivi_luminosite = suivi_luminosite[suivi_luminosite.length-2];

    suivi_humidite = results[0]["suivi_humidite"].split(";");
    suivi_humidite = suivi_humidite[suivi_humidite.length-2]*100;

  });

  connection.query('SELECT * FROM plantes WHERE id=1', function(err, results) {
    if (err) throw err
    plante_exposition = results[0]["besoins_exposition"];
    plante_arrosage = results[0]["besoins_arrosage"];
    plante_terreau = results[0]["besoins_terreau"];
  });
});




app.get("/", (req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${ville}&units=imperial&appid=${apiKey}`;
  request(url, function(err, response, body) {
    if(err) {
      console.log("erreur api temp");
      //res.render('default', {weather: null, error: 'Error'});

    } else {
      const weather = JSON.parse(body);
      my_weather = Math.floor(weather.main.temp);
    }
  });


	res.render("paud", {
		date: date,
    prenom: prenom,
    ville: ville,
    pays: pays,
    plante : plante,
    temperature_plante : suivi_temperature,
    derniere_ventilation: derniere_ventilation,
    dernier_chauffage: dernier_chauffage,
    dernier_arrosage: dernier_arrosage,
    nb_jours_plante : nb_jours_plante,
    suivi_humidite : suivi_humidite,
    suivi_luminosite : suivi_luminosite,
    plante_exposition : plante_exposition,
    plante_arrosage : plante_arrosage,
    plante_terreau : plante_terreau,
    weather : my_weather
	});


});

/*
io.on('connection', function(socket) {  
    console.log("A user is connected");
    //socket.on('join', function(user) {
    
    var d = new Date();
    var hour = (d.getHours()<10?'0':'') + d.getHours();
    var min = (d.getMinutes()<10?'0':'') + d.getMinutes();
    socket.emit('min', min);
   // });
    
});
io.on('connection', function (socket) {
  socket.emit('datetime', { datetime: new Date().getTime() });
});
*/


app.set("view engine", "pug");