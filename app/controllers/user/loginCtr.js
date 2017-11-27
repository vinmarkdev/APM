module.exports = function LoginController($scope,$state,$window,$cookies,Backend) {

    $scope.location = "Login";

    $scope.error_msg = "";
    $scope.user = {};
    
    $scope.init = init;
    $scope.login = login;
    $scope.toggle = toggle;
   // $scope.showform = true;
    $scope.init();

    function init(){
        console.log($scope.location);
        toggle();
    }

    
    function toggle() {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow").promise().then(
        function(r){
            //$scope.showform = false;
        });
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