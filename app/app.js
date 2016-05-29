'use strict';

// Declare app level module which depends on views, and components
angular.module('SaveIT', [
  'ngRoute',
  'ngCookies',
  'timer',
  'SaveIT.home',
  'SaveIT.trip',
  'SaveIT.easter',
  'SaveIT.login'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);

