/**
 * Created by tugceakin on 4/8/16.
 */

recommenderApp.controller('ActivitiesController', function($scope, $interval, $http, mapService, $cookieStore, $location) {
        if($cookieStore.get('isAuth') == false){
            $location.path( "/login" );
        }

        var url = "http://127.0.0.1:5000/getRatedRestaurants"
        var infoWindow = new google.maps.InfoWindow();
        $scope.ratedRestaurants;
        $scope.user_id = $cookieStore.get('user_id');
        $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/json'},
                data: {user_id: $scope.user_id}
            }).success(function (data) {
                $scope.ratedRestaurants = data;
                console.log(data);               
                mapService.drawMap(data, $scope);
                if(data.length > 0){
                    for (i = 0; i < $scope.ratedRestaurants.length; i++){
                        mapService.createMarker($scope.ratedRestaurants[i],infoWindow, $scope);
                    }
                }else{
                    $scope.noRatings = true;
                }
            });

        //recommendationsService.getRecommendations($scope);

        $scope.setMapCenter = function(r) {
            mapService.setMapCenter(r, infoWindow, $scope);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        };
    

});
