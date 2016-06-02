/**
 * Created by tugceakin on 3/13/16.
 */

var recommenderApp = angular.module('recommenderApp', ['chart.js', 'ngRoute', 'ngAnimate', 'uiSwitch','ui.bootstrap', 'angucomplete-alt', 'ngCookies', 'satellizer'])

    .config(function ($routeProvider, $authProvider) {

    $routeProvider.
    when('/', {
        templateUrl: 'activities.html',
        controller: 'ActivitiesController'
    }).
    when('/activities', {
        templateUrl: 'activities.html',
        controller: 'ActivitiesController'
    }).
    when('/recommendations', {
        templateUrl: 'recommendations.html',
        controller: 'RecommendationsController'
    }).
    when('/search_results', {
        templateUrl: 'search_results.html',
        controller: 'SearchRestaurantController'
    }).
    when('/stats', {
        templateUrl: 'stats.html',
        controller: 'StatsController'
    }).
    when('/login', {
        templateUrl: 'login.html',
        controller: 'SignInController'
    }).
    when('/register', {
        templateUrl: 'register.html',
        controller: 'RegistrationController'
    }).
    otherwise({redirectTo: '/'});
    

    $authProvider.oauth2({
      name: 'google',
      url: 'http://127.0.0.1:5000/authgoogle',
      clientId: '', //Put your client id here,
      redirectUri: window.location.origin, 
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      responseType: 'code'
    });
});
