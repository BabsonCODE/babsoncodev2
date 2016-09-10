var app = angular.module('code',['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider

    .when('/community', {
        templateUrl: '../../views/TheCommunity.hbs',
        controller: 'mainController'
    })

});

app.controller('mainController',['$scope', function($scope) {
    $scope.clicked = false;
}]);
