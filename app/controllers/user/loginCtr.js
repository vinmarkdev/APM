module.exports = function LoginController($scope,$state,$window,$cookies,Backend) {

    $scope.location = "Login";

    $scope.user = {};
    
    $scope.init = init;
    $scope.login = login;
    $scope.init();

    function init(){
        console.log($scope.location);
    }

    function login() {
        debugger;
        Backend.login($scope.user).then(function (response) {
            if(!response.data.Error){
                $state.go('dashboard');
            }
        },function (err) {
            debugger;
        })
    }

};
module.exports.$inject = ['$scope','$state','$window','$cookies','Backend'];