/**
 * Created by tugceakin on 3/13/16.
 */


recommenderApp.controller('RecommendationsController', function($scope, $http, mapService, $cookieStore) {
    $scope.recommendations = [];
    $scope.user_id = $cookieStore.get('user_id');
    var url = "http://127.0.0.1:5000/getRecommendations";
    var infoWindow = new google.maps.InfoWindow();
    $scope.recsReady = false;

    $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: {user_id: $scope.user_id}
        }).success(function (data) {
            $scope.recommendations = data;
            console.log(data);
            if(data.length > 0){
                initial_map_position = [data[0][1]];
                mapService.drawMap(initial_map_position, $scope);
                for (i = 0; i < $scope.recommendations.length; i++){
                    mapService.createMarker($scope.recommendations[i][1],infoWindow, $scope);
                }
                $scope.recsReady = true;
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
