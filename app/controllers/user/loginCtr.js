module.exports = function LoginController($scope,$state,$window,$cookies,Backend) {

    $scope.location = "Login";

    $scope.message = "";
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
        if($scope.user.length() < 2) {

        }
        Backend.login($scope.user).then(function (response) {
            if(!response.data.Error){
                $state.go('dashboard');
            }else{
                $scope.message = response.data.Error;
                $scope.status = "error";
            }
        },function (err) {
            $scope.message = err.message;
            $scope.status = "error";
        })
    }
    
    

};
module.exports.$inject = ['$scope','$state','$window','$cookies','Backend'];