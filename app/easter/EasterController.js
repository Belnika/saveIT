'use strict';

angular.module('SaveIT.easter', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/easter', {
    	templateUrl: 'easter/easter.html',
	    controller: 'EasterController'
  	})
}])

.controller('EasterController', ['$scope', '$location', '$http', function($scope, $location, $http) {
	
	$scope.initSlot = function() {
		initSlot();
	}
}]);