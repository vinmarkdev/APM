module.exports = function NotfoundController($scope) {
	
    $scope.location = "Notfound";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }


};
module.exports.$inject = ['$scope'];