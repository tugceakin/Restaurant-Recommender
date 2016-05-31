/**
 * Created by tugceakin on 4/8/16.
 */

recommenderApp.controller('ActivitiesController', function($scope, $interval, $http, mapService, $cookieStore, $location, restaurantService) {
        if($cookieStore.get('isAuth') == false){
            $location.path( "/login" );
        }

        var infoWindow;
        $scope.ratedRestaurants;

        $scope.getRatedRestaurants = function(){
            $scope.user_id = $cookieStore.get('user_id');
            infoWindow = new google.maps.InfoWindow();

            restaurantService.getRatedRestaurants($scope.user_id)
            .then(function (response) {
                $scope.ratedRestaurants = response.data;
                mapService.drawMap(response.data, $scope);
                if(response.data.length > 0){
                    for (i = 0; i < $scope.ratedRestaurants.length; i++){
                        mapService.createMarker($scope.ratedRestaurants[i],infoWindow, $scope);
                    }
                }else{
                    $scope.noRatings = true;
                }
            }, function (response) {
                $scope.errorGetRatedRestaurants = 'ERROR';
            });
        };

        $scope.setMapCenter = function(r) {
            mapService.setMapCenter(r, infoWindow, $scope);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };
    

});
