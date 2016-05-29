'use strict';

angular.module('SaveIT.trip', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trip', {
        templateUrl: 'trip/trip.html',
        controller: 'TripController'
  	})
}])

.controller('TripController', ['$scope', '$location', '$window', '$q', '$http', function($scope, $location, $window, $q, $http) {

	$scope.$$hasStarted = false;
	$scope.$$hasFinished = false;
	$scope.$$loading = false;

	$scope.goToHome = function() {
		$location.path("/");
	};

	$scope.startSession = function() {
		$scope.$$loading = true;
		$scope.getCurrentLocation().then(function(data) {
			$http({
				method: 'GET',
				url: '/api/start.html',
				data: {latitude: data.coords.latitude, longitude: data.coords.longitude}
			}).then(function(response) {
				if (response.data && response.data.trip && response.data.trip.start_station && response.data.trip.start_time) {
					$scope.start_station = response.data.trip.start_station;
					$scope.start_time = response.data.trip.start_time;
					$scope.$$hasStarted = true;
				}
				else {
					$scope.error = "Can't find any station next to you";
					$scope.$$hasStarted = false;
				}
				$scope.$$loading = false;
			});
		}, function(reason) {
			$scope.error = "Please activate your GPS";
			$scope.$$hasStarted = false;
			$scope.$$loading = false;
		});
	};

	$scope.finishSession = function() {
		$scope.$$loading = true;
		$scope.getCurrentLocation().then(function(data) {
			$http({
				method: 'GET',
				url: '/api/stop.html',
				data: {latitude: data.coords.latitude, longitude: data.coords.longitude}
			}).then(function(response) {
				if (response.data && response.data.trip 
					&& response.data.trip.end_station && response.data.trip.end_time
					&& response.data.trip.points && response.data.trip.distance && response.data.trip.duration) {
					$scope.end_station = response.data.trip.end_station;
					$scope.end_time = response.data.trip.end_time;
					$scope.points = response.data.trip.points;
					$scope.distance = response.data.trip.distance;
					$scope.duration = response.data.trip.duration;
					$scope.$$hasFinished = true;
				}
				else {
					$scope.error = "Can't find any station next to you";
					$scope.$$hasFinished = false;
				}
				$scope.$$loading = false;
			});
		}, function(reason) {
			$scope.error = "Please activate your GPS";
			$scope.$$hasFinished = false;
			$scope.$$loading = false;
		});
	};

	$scope.getCurrentLocation = function() {
		var deferred = $q.defer();
        $window.navigator.geolocation.getCurrentPosition(function(position){
            if (position && position.coords) {
            	deferred.resolve(position);
            }
            else {
            	deferred.reject("Test");
            }
        }, function(error) {
    		deferred.reject("No geolocation");
        });

        return deferred.promise;
	}
}]);