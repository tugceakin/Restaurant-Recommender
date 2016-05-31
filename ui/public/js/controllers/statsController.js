/**
 * Created by tugceakin on 4/25/16.
 */

recommenderApp.controller('StatsController', function($scope, $http, d3Service, statsService) {

    $scope.processing = false;
    $scope.cities = [];
    $scope.city;
    
    $scope.getCities = function(){
      statsService.getCities().then(function (response) {
          $scope.cities = response.data;
        }, function (response) {
          $scope.errorGetCities = 'ERROR';
      });
    }

    $scope.selectedCity = function(selected) {
      if (selected) {
        $scope.processing = true;
        d3.select("svg").remove();
        statsService.getMostPopularCategoriesByCity(selected.title)
        .then(function (response) {
            d3Service.drawWordCloud(response.data[selected.title]);
            $scope.processing = false; 
        }, function (response) {
            scope.errorDrawWordCloud = 'ERROR';
        });
      } 
    };

});