/**
 * Created by tugceakin on 3/13/16.
 */
//var bouncerApp = angular.module('bouncerApp', ['chart.js', 'ngRoute'])

var recommenderApp = angular.module('recommenderApp', ['chart.js', 'ngRoute', 'ngAnimate', 'uiSwitch','ui.bootstrap', 'angucomplete-alt', 'ngCookies'])

    .config(function ($routeProvider) {
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
});
