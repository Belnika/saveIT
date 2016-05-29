'use strict';

angular.module('SaveIT.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    	templateUrl: 'login/login.html',
	    controller: 'LoginController'
  	})
}])

.controller('LoginController', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies) {
	$scope.username = "Hodor";

	$scope.goToHome = function() {
		$cookies.put("username", $scope.username);
		$location.path("/home");
	}
}]);