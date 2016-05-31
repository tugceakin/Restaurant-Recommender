recommenderApp.factory('authorizationService', function($http, config) {
   return {        
        login: function(username, password){
          var url = config.apiUrl  + "/authenticateUser";

          return  $http({
                  method: 'POST',
                  url: url,
                  headers: {'Content-Type': 'application/json'},
                  data: {name: username, password: password}
              })
        },

        register: function(params){
          var url = config.apiUrl  + "/registerUser"
          
          return $http({
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'application/json'},
              data: {name: params.username, password: params.password, email: params.email, 
                     address: params.address, city: params.city }
          })
        },

   }
});