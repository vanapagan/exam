var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/styles', express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
    console.log("Server started at http://localhost:3000")
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cars', function (req, res) {
    fs.readFile(__dirname + "/" + "cars.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.post('/cars', function (req, res) {
    console.log(req);
    var brand = req.body.brand;
    var model = req.body.model;
    fs.readFile(__dirname + "/" + "cars.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push({ "id": getMaxId(data), "brand": name, "model": brand});
        res.end(JSON.stringify(data));
        fs.writeFile(__dirname + "/" + "cars.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('file saved');
        });
    });
})

app.get('/cars/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "cars.json", 'utf8', function (err, data) {
        var cars = JSON.parse(data);
        for (var i = 0; i < cars.length; i++) {
            var player = cars[i];
            if (player.id == req.params.id) {
                console.log(player);
                res.end(JSON.stringify(player));
            }
        }
    });
})

app.delete('/cars/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "cars.json", 'utf8', function (err, data) {
        var cars = JSON.parse(data);
        for (var i = 0; i < cars.length; i++) {
            var player = cars[i];
            if (player.id == req.params.id) {
                cars.splice(i, 1);
                fs.writeFile(__dirname + "/" + "cars.json", JSON.stringify(cars), function (err) {
                    if (err) throw err;
                    res.end("Successfully deleted");
                });
            }
        }
    });
})

app.get('/carbrands', function (req, res) {
    fs.readFile(__dirname + "/" + "carbrands.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/carmodels', function (req, res) {
    fs.readFile(__dirname + "/" + "carbrands.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

function getMaxId(data) {
    var maxId = 0;
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var tempId = data[i].id;
            if (tempId > maxId) {
                maxId = tempId;
            }
        }
    } else {
        maxId = 0;
    }
    return (maxId + 1);
}