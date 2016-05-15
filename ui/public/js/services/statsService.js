recommenderApp.factory('statsService', function($http) {
   return {        
        getCities: function(){
          var url = "http://127.0.0.1:5000/getCities";

          return $http({
                      method: 'POST',
                      url: url,
                      headers: {'Content-Type': 'application/json'},
                      data: {}
                  })
        },

        getMostPopularCategoriesByCity: function(title) {
          var url = "http://127.0.0.1:5000/mostPopularCategoriesByCity";

          return $http({
                  method: 'POST',
                  url: url,
                  headers: {'Content-Type': 'application/json'},
                  data: {city: title}
              });
        }
   }
});