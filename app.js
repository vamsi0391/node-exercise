var express= require('express');
var bodyParser = require('body-parser');
var app=express();
var request=require('request');
_ = require("underscore");
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

app.get('/characters/:sortType', function(req,res){
   request("http://swapi.co/api/people/?format=json", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); 
        var data=[];
        data=body;
        data = data.slice(0, 50);
        if(req.params.sortType=='name'){
          data.sort(function(a,b){
            return a.name.localeCompare(b.name);
          })
        }
        if(req.params.sortType=='mass'){
          data.sort(function (a, b) { return parseInt(a.mass) - parseInt(b.mass) })
        }
        if(req.params.sortType=='height'){
          data.sort(function (a, b) { return parseInt(a.height) - parseInt(b.height) })
        }
        console.log(data); 
    }
   }
})

app.get('/planetresidents',function(req,res){
  var data=[];
   request("http://swapi.co/api/planets/", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); 
        data= body;
        var groups = _.groupBy(data, function(obj) { return obj.name })
        var results = _.map(groups, function(groups) {
        var name = groups[0].name;
        var residents = groups[0].name
            return {name: name, residents: residents }
        })
        console.log(JSON.stringify(results))
    }
   }
})




























