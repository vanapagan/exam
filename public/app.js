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

    $scope.brand = '';
    $scope.carModels = [];
    $scope.regnumber = '';

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
        if ($scope.name != null && $scope.name != "") {
            var req = {
                method: 'POST',
                url: '/cars',
                data: { brand: $scope.brand, model: $scope.model }
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