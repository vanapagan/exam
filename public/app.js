var app = angular.module('myApp', ['ngMaterial']);

app.controller('mainController', function ($scope, $http) {

    var listCars = function () {
        return $http({
            method: 'GET',
            url: '/cars'
        });
    };

    function updateCarsList() {
        listCars().then(function successCallback(response) {
            $scope.cars = response.data;
        }, function errorCallback(response) {
        });
    }

    var listTeams = function () {
        return $http({
            method: 'GET',
            url: '/carbrands'
        });
    };

    function updateTeamsList() {
        listTeams().then(function successCallback(response) {
            $scope.teams = response.data;
        }, function errorCallback(response) {
        });
    }

    updateCarsList();
    updateTeamsList();

    $scope.brand = 'BMW';
    $scope.model = '530';

    $scope.filterCars = "";

    $scope.data = {
        selectedIndex: 0
    };

    $scope.next = function () {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };

    $scope.previous = function () {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };

    var deleteCar = function (id) {
        return $http.delete("/cars" + "/" + id);
    }

    $scope.deleteCar = function (id) {
        deleteCar(id).then(function successCallback(response) {
            updateCarsList();
        }, function errorCallback(response) {
            return response;
        });
    };

    var addNewPlayer = function (data) {
        return $http.post("/cars", data);
    };

    $scope.addCar = function () {
        if ($scope.name != null && $scope.name != "") {
            var req = {
                method: 'POST',
                url: '/cars',
                data: { brand: $scope.brand, model: $scope.model}
            };
            $http(req).then(function successCallback(response) {
                updateCarsList();
                $scope.brand = '';
                $scope.model = '';
                $scope.number = '';
            }, function errorCallback(response) {
                return response;
            });
        }
    }

});