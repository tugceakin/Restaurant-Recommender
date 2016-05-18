recommenderApp.factory('statsService', function($http, config) {
   return {        
        getCities: function(){
          var url = config.apiUrl  + "/getCities";

          return $http({
                      method: 'POST',
                      url: url,
                      headers: {'Content-Type': 'application/json'},
                      data: {}
                  })
        },

        getMostPopularCategoriesByCity: function(title) {
          var url = config.apiUrl  + "/mostPopularCategoriesByCity";

          return $http({
                  method: 'POST',
                  url: url,
                  headers: {'Content-Type': 'application/json'},
                  data: {city: title}
              });
        }
   }
});