module.exports = function ResetCtr($scope,$state){

    $scope.location = "Login";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }

};
module.exports.$inject = ['$scope','$state'];