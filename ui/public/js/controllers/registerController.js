recommenderApp.controller('RegistrationController', function($scope, $http, $location, $cookieStore, config, authorizationService) {
   
    $scope.SuccessRegister = false;
    
    $scope.register = function() {

        authorizationService.register($scope.params)
        .then(function (response) {
            $scope.SuccessRegister = true;
            if(response.data !== 'success'){
                $location.path("/" + "register");
            }
        }, function (response) {
            $scope.registerError = true;
        });

    };

    $scope.login = function(){
        $location.path("/" + "login");
    }

});