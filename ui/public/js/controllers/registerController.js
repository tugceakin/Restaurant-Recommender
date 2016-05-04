recommenderApp.controller('RegistrationController', ['$scope', '$http', '$location' ,'$cookieStore', function($scope, $http, $location, $cookieStore) {
    
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.SuccessRegister = false;
    $scope.register = function() {
        /*$scope.user_email = $scope.email;
        $scope.user_type = $cookieStore.get("user_type");

        if($scope.params.username == $scope.params.password){
            $cookieStore.put('isAuth', true);
            $cookieStore.put('userId', 'tUid1');
            $location.path("/" + "main");
        }
        $location.path("/" + "login");*/
        console.log("Registration Has been Successfully called");

        var url = "http://127.0.0.1:5000/registerUser"
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: {name: $scope.params.username, password: $scope.params.password, email: $scope.params.email, address: $scope.params.address, city: $scope.params.city }
        }).success(function (data) {
            $scope.restaurants = data;
            console.log(data);
            $scope.SuccessRegister = true;
            if(data === 'success'){
                //$location.path("/" + "login");
            }else{
                $location.path("/" + "register");
            }
            
        }).error(function(err){
            console.log(err);
            $location.path("/" + "login");
        });

    };

    $scope.login = function(){
        $location.path("/" + "login");
    }

}]);