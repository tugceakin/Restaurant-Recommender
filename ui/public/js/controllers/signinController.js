recommenderApp.controller('SignInController', function($scope, config, $http, $cookieStore, $location, authorizationService) {

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


    $scope.register = function(){
        $location.path("/" + "register");
    }
});