'use strict';

// Declare app level module which depends on views, and components
angular.module('SaveIT', [
  'ngRoute',
  'timer',
  'SaveIT.home',
  'SaveIT.trip',
  'SaveIT.easter'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);

