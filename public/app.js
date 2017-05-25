var app = angular.module('myApp', ['ngMaterial', 'chart.js']);

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

    var listBrands = function () {
        return $http({
            method: 'GET',
            url: '/carbrands'
        });
    };

    function updateCarBrandsList() {
        listBrands().then(function successCallback(response) {
            $scope.carBrands = response.data;
        }, function errorCallback(response) {
        });
    }

    updateCarsList();
    updateCarBrandsList();

    $scope.brand = 'BMW';
    $scope.model = "320d";
    $scope.regnumber = '123XFX';
    $scope.power = 110;
    $scope.year = 1999;
    $scope.carModels = [];

    $scope.isBrandSelected = function () {
        if ($scope.brand != null && $scope.brand != "") {
            updateCarModelsList();
        }
    }

    var listModels = function () {
        return $http({
            method: 'GET',
            url: '/carmodels'
        });
    };

    function updateCarModelsList() {
        listModels().then(function successCallback(response) {
            var carBrands = response.data;
            if ($scope.carBrands != null && $scope.carBrands.length > 0 && $scope.brand != null && $scope.brand != "") {
                for (var i = 0; i < carBrands.length; i++) {
                    var brand = carBrands[i];
                    if ($scope.brand == brand.name) {
                        console.log(brand.models);
                        $scope.carModels = brand.models;
                    }
                }
            }
        }, function errorCallback(response) {
        });
    }

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
        if ($scope.model != null && $scope.model != "") {
            console.log("tere");
            var req = {
                method: 'POST',
                url: '/cars',
                data: { brand: $scope.brand, model: $scope.model, regnumber: $scope.regnumber, power: $scope.power, year: $scope.year }
            };
            $http(req).then(function successCallback(response) {
                updateCarsList();
                $scope.brand = '';
                $scope.model = '';
                $scope.regnumber = '';
                $scope.power = 0;
                $scope.year = 0;
            }, function errorCallback(response) {
                return response;
            });
        }
    }

    //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    //$scope.data = [300, 500, 100];

    $scope.labels = ["BMW", "Audi", "Volkswagen"];
    $scope.data = [300, 250, 800];

    $scope.drawDiagram = function () {
        listCars().then(function successCallback(response) {
            
            $scope.cars = response.data;
        }, function errorCallback(response) {
        });
    }

});