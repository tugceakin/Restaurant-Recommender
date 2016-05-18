recommenderApp.controller('SignInController', function($scope, config, $http, $cookieStore, $location) {

    if($cookieStore.get('isAuth') == true){
        $location.path( "/" );
    }
    //$scope.isAuth = false;
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.errorLogin = false;
    $scope.processing = false;
    $scope.signin = function() {
        $scope.user_email = $scope.email;
        $scope.user_type = $cookieStore.get("user_type");
        $scope.uName = $scope.username;
        $scope.errorLogin = false;
        $scope.processing = true;


        var url = config.apiUrl  + "/authenticateUser"
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: {name: $scope.params.username, password: $scope.params.password}
        }).success(function (data) {
            $scope.restaurants = data;
            console.log(data);
            $scope.processing = false;

            if(data[0] === 'true'){
                console.log(data);
                $cookieStore.put('isAuth', true);
                $cookieStore.put('user_id', data[1]);
                $location.path("/activities");
            }else{
                $scope.errorLogin = true;
            }

            
        }).error(function(err){
            console.log(err);
            $location.path("/" + "login");
        });
    };


    $scope.register = function(){
        $location.path("/" + "register");
    }
});