/**
 * Created by tugceakin on 4/25/16.
 */

recommenderApp.controller('StatsController', function($scope, $http, d3Service) {
    var url = "http://127.0.0.1:5000/getCities"

    $scope.processing = false;
    $scope.cities = [];
    $scope.city;
    $http({
        method: 'POST',
        url: url,
        headers: {'Content-Type': 'application/json'},
        data: {}
    }).success(function (data) {
        $scope.cities = data;
        console.log(data);
    });

    $scope.selectedCity = function(selected) {
      if (selected) {
        $scope.processing = true;
         console.log(selected.title);
        // $scope.getCityStats(selected.title);
        d3.select("svg").remove();
        var url = "http://127.0.0.1:5000/mostPopularCategoriesByCity"
        $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/json'},
                data: {city: selected.title}
            }).success(function (data) {
                $scope.mostpop = data;
                console.log(data);
                //drawD3Graph(data["Las Vegas"]);
                d3Service.drawWordCloud(data[selected.title]);
                $scope.processing = false;
        });
      } 
    };

});