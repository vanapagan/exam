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

app.get('/players', function (req, res) {
    fs.readFile(__dirname + "/" + "players.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.post('/players', function (req, res) {
    console.log(req);
    var team = req.body.team;
    var number = req.body.number;
    var name = req.body.name;
    fs.readFile(__dirname + "/" + "players.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push({ "id": getMaxId(data), "name": name, "team": team, "number": number });
        res.end(JSON.stringify(data));
        fs.writeFile(__dirname + "/" + "players.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('file saved');
        });
    });
})

app.get('/players/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "players.json", 'utf8', function (err, data) {
        var players = JSON.parse(data);
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (player.id == req.params.id) {
                console.log(player);
                res.end(JSON.stringify(player));
            }
        }
    });
})

app.delete('/players/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "players.json", 'utf8', function (err, data) {
        var players = JSON.parse(data);
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (player.id == req.params.id) {
                players.splice(i, 1);
                fs.writeFile(__dirname + "/" + "players.json", JSON.stringify(players), function (err) {
                    if (err) throw err;
                    res.end("Successfully deleted");
                });
            }
        }
    });
})

app.get('/teams', function (req, res) {
    fs.readFile(__dirname + "/" + "teams.json", 'utf8', function (err, data) {
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