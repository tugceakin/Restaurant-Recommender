recommenderApp.factory('mapService', function() {
    return {
        createMarker: function(info, infowindow, $scope) {
            var image = "/img/red_marker.png";
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.latitude, info.longitude),
                title: info.name,
                full_address: info.full_address,
                icon: image,
                business_id: info.business_id
            });
            marker.content = '<div class="infoWindowContent"><label>Name: </label>'+ info.name + 
            '&nbsp;&nbsp;&nbsp;<label>Address: </label>' + info.allocation_id + '</div>';

            google.maps.event.addListener(marker, 'click', function(){
                infowindow.setContent('<h4>' + marker.title + '</h4>' + marker.full_address);
                infowindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);
            console.log(marker);
        },

        drawMap: function(data, $scope){
            var zoomPosition = [];

            if(data.length < 1){
                zoomPosition = [36.1699, -115.1398]; //Latitude, longitude info for Las Vegas(Zooms to Las Vegas by default)
            }else{
                zoomPosition = [data[0].latitude, data[0].longitude];
            }

            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(zoomPosition[0], zoomPosition[1]),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            $scope.markers = [];
        },

        setMapCenter: function(r, infoWindow, $scope){
            console.log("set center")
            $scope.map.setCenter({lat: r.latitude, lng: r.longitude});
            infoWindow.setContent('<h4>' + r.name + '</h4>' + r.full_address);
            for(var i=0; i<$scope.markers.length; i++){
                                console.log($scope.markers[i].business_id);
                if($scope.markers[i].business_id == r.business_id){
                    infoWindow.open($scope.map, $scope.markers[i]);
                    //Scroll to top after clicking a restaurant div
                    $('html, body').animate({scrollTop:$("#activity-page-map").offset().top},1000); 
                }
            }
        }
    };
});