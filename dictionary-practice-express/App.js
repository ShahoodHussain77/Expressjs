var express = require("express");

var cors = require("cors");

var bodyParser = require("body-parser");

var app = express();

var terms = [
    {
        term: "Rip",
        defined: "To move at a high rate of speed"
    },
    {
        term: "Huck",
        defined: "To throw your body off of something, usually a natural feature like a cliff"
    },
    {
        term: "Chowder",
        defined: "Powder after it has been sufficiently skied"
    }
];

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function( req, res, next ){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.use( express.static("./public") );

app.use( cors() );

app.get("/dictionary-api", function( request, response ) {
    response.json(terms);
});

app.post("/dictionary-api", function( request, response ) {
    terms.push(request.body);
    response.json(terms);
});

app.delete("/dictionary-api/:term", function( request, response ) {
    terms = terms.filter( function( defination ) {
        return defination.term.toLowerCase() !== request.params.term.toLowerCase();
    });
    response.json(terms);
});

app.listen(5000);

console.log("Express app is running on port 5000");

module.exports = app;
