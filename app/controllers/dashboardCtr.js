module.exports = function DashboardController($scope,$state,Backend) {

    $scope.location = "Dashboard";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }

    Backend.test().then(function (resp) {
        debugger;
        
    })

};
module.exports.$inject = ['$scope','$state','Backend'];