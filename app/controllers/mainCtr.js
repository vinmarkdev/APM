module.exports = function MainController($scope,$state,$window,$cookies) {

    $scope.location = "Main";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }

};
module.exports.$inject = ['$scope','$state','$window','$cookies'];