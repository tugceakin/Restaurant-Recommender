/**
 * Created by tugceakin on 4/25/16.
 */

recommenderApp.controller('StatsController', function($scope, $http, d3Service, statsService) {

    $scope.processing = false;
    $scope.cities = [];
    $scope.city;
    
    statsService.getCities().success(function (data) {
        $scope.cities = data;
    });

    $scope.selectedCity = function(selected) {
      if (selected) {
        $scope.processing = true;
        d3.select("svg").remove();
        statsService.getMostPopularCategoriesByCity(selected.title).success(function (data) {
                  $scope.mostpop = data;
                  d3Service.drawWordCloud(data[selected.title]);
                  $scope.processing = false;
          });
      } 
    };

});