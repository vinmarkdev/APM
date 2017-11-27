module.exports = function HomeController($scope,$state,$window,$cookies) {

    $scope.location = "Home";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }

};
module.exports.$inject = ['$scope','$state','$window','$cookies'];