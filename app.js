// app
var request = require("request");
var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("partials/search.ejs");
});

app.get("/search", function(req,res) {
    var movie = req.query.movieInput;
    request("http://www.omdbapi.com/?s="+movie+"&apikey=thewdb", function(error, response, body) {
        if(!error && response.statusCode == 200) // tutto ok
        {
            var result = JSON.parse(body);
            res.render("movies",{result:result["Search"]});
        }
        else {
            res.send("Sorry =(");
        }
    });
});

app.get("/show", function(req,res) {
    var id = req.query.movieID;
    request("http://www.omdbapi.com/?i="+id+"&apikey=thewdb", function(error, response, body) {
        if(!error && response.statusCode == 200) // tutto ok
        {
            var result = JSON.parse(body);
            res.render("moviePage",{result:result});
        }
        else {
            res.send("Sorry =(");
        }
    });
});


app.listen(6002, function() {
	console.log("Server has started")
});