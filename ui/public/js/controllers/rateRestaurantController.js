/**
 * Created by tugceakin on 4/18/16.
 */

recommenderApp.controller('RateRestaurantController', function($scope, $http, $location) {
    console.log("rate res");
    $scope.rateRestaurant = function() {
        var url = "http://127.0.0.1:5000/rateRestaurant"

        $scope.rating = 4;
        $scope.business_id = "J009bXTEI0uUKQMRL2Fpqw"
        $scope.user_id = "1"
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: {rating: $scope.rating, user_id: $scope.user_id, business_id: $scope.business_id}
        }).success(function (data) {
            $scope.restaurants = data;
            console.log(data);
        });
    };

});