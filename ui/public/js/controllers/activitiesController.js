/**
 * Created by tugceakin on 4/8/16.
 */

recommenderApp.controller('ActivitiesController', function($scope, $interval, $http, mapService, $cookieStore, $location, restaurantService) {
        if($cookieStore.get('isAuth') == false){
            $location.path( "/login" );
        }

        var infoWindow = new google.maps.InfoWindow();
        $scope.ratedRestaurants;
        $scope.user_id = $cookieStore.get('user_id');
        restaurantService.getRatedRestaurants($scope.user_id).success(function (data) {
                $scope.ratedRestaurants = data;
                mapService.drawMap(data, $scope);
                if(data.length > 0){
                    for (i = 0; i < $scope.ratedRestaurants.length; i++){
                        mapService.createMarker($scope.ratedRestaurants[i],infoWindow, $scope);
                    }
                }else{
                    $scope.noRatings = true;
                }
            });

        $scope.setMapCenter = function(r) {
            mapService.setMapCenter(r, infoWindow, $scope);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };
    

});
