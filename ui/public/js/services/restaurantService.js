recommenderApp.factory('restaurantService', function($http, config) {
   return {        
        getRatedRestaurants: function(user_id){
        var url = config.apiUrl  + "/getRatedRestaurants";

          return $http({
                  method: 'POST',
                  url: url,
                  headers: {'Content-Type': 'application/json'},
                  data: {user_id: user_id}
              })
        },

        rateRestaurant: function($scope, r) {
          var url = config.apiUrl + "/rateRestaurant"

          return $http({
                  method: 'POST',
                  url: url,
                  headers: {'Content-Type': 'application/json'},
                  data: { stars: $scope.rating, user_id: $scope.user_id, business_id: r.business_id,
                    latitude: r.latitude, longitude: r.longitude, city: r.city, full_address: r.full_address,
                    categories: r.categories, name: r.name, state: r.state, average_rating: r.stars}
                    
              })
        },

        searchRestaurant: function(name){
          var url = config.apiUrl + "/searchRestaurants"
          
          return $http({
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'application/json'},
              data: {name: name}
           })
        }
   }
});