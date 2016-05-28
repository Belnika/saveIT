'use strict';

angular.module('SaveIT.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    	templateUrl: 'home/home.html',
	    controller: 'HomeController'
  	})
}])

.controller('HomeController', ['$scope', '$location', '$http', function($scope, $location, $http) {
	$scope.user = null;
	$scope.easter = [false, false, false, false];
	
	$scope.goToStart = function() {
		$location.path("/trip");
	};

	$scope.fetchUser = function() {
		$http.get("/api/user.html").then(function(response){
			if (response.data && response.data.user) {
				$scope.user = response.data.user;
			}
			else {
				//TODO redirect to login
			}
			console.log($scope.user);
		});
	}

	$scope.goToEaster = function(i) {
		$scope.easter[i] = true;
				
		if ($scope.easter[0] && $scope.easter[1]
			&& $scope.easter[2] && $scope.easter[3]) {
			$location.path("/easter");
		}
	}
}]);