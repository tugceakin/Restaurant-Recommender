describe('ActivitiesController', function() {

    var scope;
    var controller;
    var getResponse = { data: 'this is a mocked response' };
    var getDeferred;
    var restaurantServiceMock;

    beforeEach(module('recommenderApp'));
    beforeEach(inject(function($q, $controller, $rootScope, $routeParams) {

        scope = $rootScope;
        restaurantServiceMock = {
            getRatedRestaurants: function() {}
        };
        
        getDeferred = $q.defer();
        spyOn(restaurantServiceMock, 'getRatedRestaurants').and.returnValue(getDeferred.promise);

        controller = $controller('ActivitiesController', { $scope: scope, restaurantService: restaurantServiceMock});  
    }));

    it('should set scope.ratedRestaurant to response data when successful', function () {
        getDeferred.resolve(getResponse);
        scope.getRatedRestaurants('1');
        scope.$apply();
        expect(restaurantServiceMock.getRatedRestaurants).toHaveBeenCalled();
        expect(scope.ratedRestaurants).toEqual(getResponse.data);
    });

    it('should set scope.errorGetRatedRestaurants to ERROR when unsuccessful', function () {
        getDeferred.reject(getResponse);
        scope.getRatedRestaurants('1');
        scope.$apply();
        expect(restaurantServiceMock.getRatedRestaurants).toHaveBeenCalled();
        expect(scope.errorGetRatedRestaurants).toEqual('ERROR');
    });


});



