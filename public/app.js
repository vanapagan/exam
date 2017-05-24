var app = angular.module('myApp', ['ngMaterial']);

app.controller('mainController', function ($scope, $http) {

    var listPlayers = function () {
        return $http({
            method: 'GET',
            url: '/players'
        });
    };

    function updatePlayersList() {
        listPlayers().then(function successCallback(response) {
            $scope.players = response.data;
        }, function errorCallback(response) {
        });
    }

    var listTeams = function () {
        return $http({
            method: 'GET',
            url: '/teams'
        });
    };

    function updateTeamsList() {
        listTeams().then(function successCallback(response) {
            $scope.teams = response.data;
        }, function errorCallback(response) {
        });
    }

    updatePlayersList();
    updateTeamsList();

    $scope.team = "Rakvere Tarvas";
    $scope.name = 'Kristo Palo';
    $scope.number = "66";

    $scope.filterPlayers = "";
    $scope.filterTeams = "";
    $scope.msg = "";

    $scope.data = {
        selectedIndex: 0
    };

    $scope.next = function () {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 3);
    };

    $scope.previous = function () {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

    var deletePlayer = function (id) {
        return $http.delete("/players" + "/" + id);
    }

    $scope.deletePlayer = function (id) {
        deletePlayer(id).then(function successCallback(response) {
            updatePlayersList();
        }, function errorCallback(response) {
            return response;
        });
    };

    var addNewPlayer = function (data) {
        return $http.post("/players", data);
    };

    $scope.addPlayer = function () {
        if ($scope.name != null && $scope.name != "") {
            var req = {
                method: 'POST',
                url: '/players',
                data: { name: $scope.name, number: $scope.number, team: $scope.team }
            };
            $http(req).then(function successCallback(response) {
                updatePlayersList();
                $scope.name = '';
                $scope.team = '';
                $scope.number = '';
            }, function errorCallback(response) {
                return response;
            });
        }
    }

});