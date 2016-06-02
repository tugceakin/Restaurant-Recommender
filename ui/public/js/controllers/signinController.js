recommenderApp.controller('SignInController', function($scope, $rootScope, config, $http, $cookieStore, $location, authorizationService, $auth) {

    if($cookieStore.get('isAuth') == true){
        $location.path( "/" );
    }
    $scope.invalid_login = true;
    $scope.errorLogin = false;
    $scope.processing = false;

    $scope.signin = function() {
        $scope.user_email = $scope.email;
        $scope.user_type = $cookieStore.get("user_type");
        $scope.errorLogin = false;
        $scope.processing = true;

        authorizationService.login($scope.params.username, $scope.params.password)
        .then(function (response) {
            $scope.processing = false;
            if(response.data[0] === 'true'){
                $cookieStore.put('isAuth', true);
                $cookieStore.put('user_id', response.data[1]);
                $location.path("/activities");
            }else{
                $scope.errorLogin = true;
            }

        }, function (response) {
            $location.path("/" + "login");
        });
    };

    $scope.authenticate = function(provider) {
      $scope.processing = true;

      $auth.authenticate(provider)
      .then(function(response) {
        $scope.processing = false;
        $cookieStore.put('isAuth', true);
        $cookieStore.put('user_id', response.data.user_id);
        $location.path("/activities");
      })
      .catch(function(response) {
        $scope.processing = false;
        $scope.errorLogin = true;
      });
    };


    $scope.register = function(){
        $location.path("/" + "register");
    }
});