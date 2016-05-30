/**
 * Created by tugceakin on 4/15/16.
 */

recommenderApp.controller('SearchRestaurantController', function($scope, $http, $location, $cookieStore, tableService, restaurantService, config) {


    if($cookieStore.get('isAuth')){
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
        var currentPage = $scope.currentPage;
        var itemsPerPage = $scope.itemsPerPage;
        $scope.restaurantsInCurrentPage = $scope.restaurants.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage);
      };

      $scope.sort = function(sortType){
        tableService.sort(sortType, $scope);
      };

    $scope.searchRestaurant = function(name) {
        $scope.searching = true;

        restaurantService.searchRestaurant(name)
            .success(function (data) {
                $scope.restaurants = data;
                $scope.totalItems = $scope.restaurants.length;
                $scope.restaurants.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
                $scope.restaurantsInCurrentPage = $scope.restaurants.slice(0, $scope.itemsPerPage);
                $scope.searching = false;
                $location.path("/" + "search_results");
        });
    };

    $scope.rateRestaurant = function(value, r) {
        $scope.rating = value;
        restaurantService.rateRestaurant($scope, r)
        .success(function (data) {
            $scope.restaurants = data;
            $scope.data = data;
            console.log(data);
            $location.path("/");
        });

    $scope.logout = function() {
        console.log("clicked logout");
        $cookieStore.put('isAuth', false);
        $location.path("/" + "login");
    };
};

});
