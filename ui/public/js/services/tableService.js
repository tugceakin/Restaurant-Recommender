recommenderApp.factory('tableService', function() {
    return {
        sort: function(sortType, $scope) {
            $scope.sortType = sortType;
            $scope.currentPage = 1;
            $scope.sortReverse  = !$scope.sortReverse;
            $scope.restaurants.sort(function(a, b) {
                if($scope.sortType == "city"){
                    if($scope.sortReverse == false){
                        return a.city.localeCompare(b.city);
                    }
                    else{
                        return b.city.localeCompare(a.city);
                    }
                }else if($scope.sortType == "name"){
                    if($scope.sortReverse == false){
                        return a.name.localeCompare(b.name);
                    }
                    else{
                        return b.name.localeCompare(a.name);
                    }
                }else if($scope.sortType == "stars"){
                    if($scope.sortReverse == false){
                        return parseFloat(a.stars) - parseFloat(b.stars);
                    }
                    else{
                        return parseFloat(b.stars) - parseFloat(a.stars);
                    }
                }
            });
            $scope.pageChanged();
        }
    };
});