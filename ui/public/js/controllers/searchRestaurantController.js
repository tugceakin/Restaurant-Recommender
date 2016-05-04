/**
 * Created by tugceakin on 4/15/16.
 */

recommenderApp.controller('SearchRestaurantController', function($scope, $http, $location, $cookieStore, tableService) {


    if($cookieStore.get('isAuth')){
        console.log("true");
        $scope.isAuth = true;
    }else{
        $scope.isAuth = false;
        $location.path( "/login" );

    }

    $scope.searching = false;
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };

    $scope.mouseLeave = function(value) {
    $scope.overStar = value;
    };

    $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}];


      $scope.viewby = 20;
      $scope.currentPage = 1;
      $scope.itemsPerPage = $scope.viewby;
      $scope.maxSize = 5; //Number of pager buttons to show


      $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
        console.log('sorting order ' + $scope.sortReverse);
        $scope.restaurantsInCurrentPage = $scope.restaurants.slice(($scope.currentPage - 1) * $scope.itemsPerPage, ($scope.currentPage - 1) * $scope.itemsPerPage+ $scope.itemsPerPage);

      };

      $scope.sort = function(sortType){
        tableService.sort(sortType, $scope);
      };

    $scope.searchRestaurant = function(name) {
        $scope.searching = true;
        console.log(name);
        var url = "http://127.0.0.1:5000/searchRestaurants"
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: {name: name}
        }).success(function (data) {
            $scope.restaurants = data;
            $scope.totalItems = $scope.restaurants.length;
            $scope.restaurants.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
            $scope.restaurantsInCurrentPage = $scope.restaurants.slice(0, $scope.itemsPerPage);
            // console.log(data);
            $scope.searching = false;
            $location.path("/" + "search_results");
        });
    };

    $scope.rateRestaurant = function(value, r) {
        var url = "http://127.0.0.1:5000/rateRestaurant"
        $scope.rating = value;
        $scope.business_id = r.business_id;
        $scope.user_id = $cookieStore.get('user_id');
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: { stars: $scope.rating, user_id: $scope.user_id, business_id: $scope.business_id,
                    latitude: r.latitude, longitude: r.longitude, city: r.city, full_address: r.full_address,
                    categories: r.categories, name: r.name, state: r.state, average_rating: r.stars}
        }).success(function (data) {
            $scope.restaurants = data;
            $scope.data = data;
            console.log(data);
            $location.path("/");
        });
    };

     $scope.logout = function() {
        console.log("clicked logout");
        $cookieStore.put('isAuth', false);
        //$scope.isAuth = false;
        $location.path("/" + "login");
               // document.getElementById("search-menu").style.display = "none";
    };

});
