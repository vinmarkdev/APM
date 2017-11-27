module.exports = function SignupCtr($scope,$state,Backend){

    $scope.location = "Signup";

    $scope.error_msg = "";
    $scope.user = {};

    $scope.init = init;
    $scope.signUp = signUp;

    $scope.init();

    function init(){
        console.log($scope.location);
    }

    function signUp() {
        $scope.error_msg = "";
        
        if($scope.user.name &&
            $scope.user.password &&
            $scope.user.email &&
            ($scope.user.password == $scope.user.repassword)){

            var data = {};
            data.name = $scope.user.name;
            data.email = $scope.user.email;
            data.password = $scope.user.password;

            Backend.signup(data).then(function (response) {
                if(!response.data.Error){
                    $state.go("login");
                }else{
                    $scope.error_msg = response.data.Error;
                }
            },function (err) {
                $scope.error_msg = err.message;
            })
        }
    }
};
module.exports.$inject = ['$scope','$state','Backend'];