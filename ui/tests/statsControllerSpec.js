describe('StatsController', function() {

    var scope;
    var controller;
    var getResponse = { data: 'this is a mocked response' };
    var getDeferred;
    var statsServiceMock;

    beforeEach(module('recommenderApp'));
    beforeEach(inject(function($q, $controller, $rootScope, $routeParams) {

        scope = $rootScope;
        statsServiceMock = {
            getCities: function() {},
            getMostPopularCategoriesByCity: function() {}
        };
        d3ServiceMock = {
            drawWordCloud: function() {}
        };
        
        getDeferred = $q.defer();
        spyOn(statsServiceMock, 'getCities').and.returnValue(getDeferred.promise);
        spyOn(statsServiceMock, 'getMostPopularCategoriesByCity').and.returnValue(getDeferred.promise);
        spyOn(d3ServiceMock, 'drawWordCloud').and.returnValue(getDeferred.promise);

        controller = $controller('StatsController', { $scope: scope, statsService: statsServiceMock, d3Service: d3ServiceMock });  
    }));

    it('should set scope.cities to response data when successful', function () {
        getDeferred.resolve(getResponse);
        scope.getCities();
        scope.$apply();
        expect(statsServiceMock.getCities).toHaveBeenCalled();
        expect(scope.cities).toEqual(getResponse.data);
    });

    it('should set scope.errorGetCities to ERROR when unsuccessful', function () {
        getDeferred.reject(getResponse);
        scope.getCities();
        scope.$apply();
        expect(statsServiceMock.getCities).toHaveBeenCalled();
        expect(scope.errorGetCities).toEqual('ERROR');
    });

    it('should call statsServiceMock.getMostPopularCategoriesByCity and then d3Service.drawWordCloud when a city is selected', function () {
        scope.selectedCity('Las Vegas');
        getDeferred.resolve(getResponse);
        scope.$apply();
        expect(statsServiceMock.getMostPopularCategoriesByCity).toHaveBeenCalled();
        expect(d3ServiceMock.drawWordCloud).toHaveBeenCalled();
    });

});



