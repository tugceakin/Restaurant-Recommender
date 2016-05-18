recommenderApp.factory('restaurantService', function($http) {
   return {        
        getRatedRestaurants: function(user_id){
        var url = "http://127.0.0.1:5000/getRatedRestaurants";

          return $http({
                  method: 'POST',
                  url: url,
                  headers: {'Content-Type': 'application/json'},
                  data: {user_id: user_id}
              })
        },

        rateRestaurant: function(rating, user_id, business_id) {
          var url = "http://127.0.0.1:5000/rateRestaurant"

          return $http({
                  method: 'POST',
                  url: url,
                  headers: {'Content-Type': 'application/json'},
                  data: {rating: rating, user_id: user_id, business_id: business_id}
              })
        }
   }
});