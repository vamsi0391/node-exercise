var express= require('express');
var bodyParser = require('body-parser');
var app=express();
var request=require('request');
app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.get('/character/:name',function(req,res){
  var name=req.params.name;
  request("http://swapi.co/api/people/:name?format=json", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); 
        res.render('user.ejs',{
        name: body.name,
        height: body.height,
        mass:body.mass,
        hair_color:body.hair_color,
        skin_color:body.skin_color,
        eye_color:body.eye_color,
        birth_year:body.birth_year,
        gender:body.gender,
        homeworld:body.homeworld,
        films:body.films,
        species:body.species,
        vehicles:body.vehicles,
        starships:body.starships,
        created:body.created,
        edited:body.edited
    });
    }
});
})


