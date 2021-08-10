const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs"); //handlebar
const bodyParser = require('body-parser');

const geoCoding = require("./util/geoCoding");
const foreCast = require("./util/foreCast");

// Define Path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup static directory to serve
app.use(express.static(publicDirPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render("home", {
        title: "Weather"
    });
});

app.get('/help', function (req, res) {
    res.render("help", {
        title: "Help"
    });
});

app.get('/about', function (req, res) {
    res.render("about", {
        title: "About"
    });
});

app.get('/api/weather', function (req, res) {
    geoCoding(req.query.city, function (error, data) {
        if (error) {
            res.status(500).send(error);
            return;
        }
        foreCast(data, function (error, result) {
            if (error) {
                res.status(500).send(error);
                return;
            }            
            res.status(200).send(result);
        });
    });
});

app.listen(8000, function () {
    console.log("The project is running in 8000 port");
});