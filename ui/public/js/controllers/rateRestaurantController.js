/**
 * Created by tugceakin on 4/18/16.
 */

recommenderApp.controller('RateRestaurantController', function($scope, $http, $location, restaurantService) {
    $scope.rateRestaurant = function() {
        restaurantService.rateRestaurant($scope.rating, $scope.user_id, $scope.business_id)
            .success(function (data) {
                $scope.restaurants = data;
            });
    };

});