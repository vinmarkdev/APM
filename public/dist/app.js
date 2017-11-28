(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports.view_restriction = ViewRestriction;
module.exports.view_restriction.$inject = ['$http', '$state', '$rootScope', '$cookies'];

function ViewRestriction($http, $state, $rootScope, $cookies) {

    /**
     * check if user don't login
     * login him kike guest
     */
    /*if (!$cookies.getObject('token')) {
        var data = {};
        BackendService.loginGuest(data).then(
            function (response) {
                if (!response.data.Error) {
                    $cookies.putObject('jwt', response.data.token);
                }
                else {

                }
            }
        );
    }*/

    
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        /** check if user data exist */
        /*var user = "";
        if($cookies.getObject('token')){
            user = JSON.parse(jwtHelper.decodeToken($cookies.getObject('jwt')).user);
        }*/

        /** hide signup page if user olredy logined */
        if (toState['name'] == 'signup') {
            if ($cookies.get('auth')) {

                $state.go('dashboard');
                event.preventDefault();

            }
        }

        /** hide login page if user olready login */
        if (toState['name'] == 'login') {
            if ($cookies.get('auth')) {

                $state.go('dashboard');
                event.preventDefault();

            }
        }

        /** check if user can see profile page */
        if (toState['name'] == 'dashboard') {
            if (!$cookies.get('auth')) {

                $state.go('login');
                event.preventDefault();

            }
        }


    });

}



module.exports.interceptor = Interceptor;
module.exports.interceptor.$inject = ['$injector', '$window', '$q', '$cookies','$rootScope'];


function Interceptor($injector, $window, $q, $cookies,$rootScope) {

    return {
        request: function (config) {
           
            if ($cookies.get('auth')) {
                config.headers['Authorization'] = $cookies.get('auth');
            }
            return config;
        },
        response: function (response) {

            if (!response.Error) {
                if (response.data.token) {
                    $cookies.put('auth', response.data.token);
                }
            }
            return response;
        },
        responseError: function (response) {
            //if 403 
            //redirect to page error 
            return response;  //it is requiring to provide
        }
    }
}

},{}],2:[function(require,module,exports){
module.exports.$inject = ['$stateProvider','$urlRouterProvider', '$httpProvider'];
module.exports = function ($stateProvider, $urlRouterProvider, $httpProvider){


    /**
     * cookie protection
     */
    $httpProvider.interceptors.push('cookieInterceptor');



	$urlRouterProvider.when('','/');

	$urlRouterProvider.otherwise('/404');

    
	$stateProvider
		.state('404', {
            url: '/404',
            templateUrl: './app/views/errors/404.html',
            controller: require('controllers/notfoundCtr.js')
        })
        .state('403', {
            url: '/403',
            templateUrl: './app/views/errors/403.html'
        })
        .state('500', {
            url: '/500',
            templateUrl: './app/views/errors/500.html'
        })

        /**
         * User stats
         */
		.state('login', {
            url: '/login',
            templateUrl: './app/views/user/login.html',
            controller: require('controllers/user/loginCtr.js')
        })
        .state('signup', {
            url: '/signup',
            templateUrl: './app/views/user/signup.html',
            controller: require('controllers/user/signupCtr.js')
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: './app/views/user/forgot.html',
            controller: require('controllers/user/forgotCtr.js')
        })
        .state('reset', {
            url: '/reset',
            templateUrl: './app/views/user/reset.html',
            controller: require('controllers/user/resetCtr.js'),
        })

        .state('main', {
            url: '',
            templateUrl: './app/views/main.html',
            controller: require('controllers/mainCtr.js'),
        })

        .state('main.home', {
            url: '/',
            templateUrl: './app/views/home.html',
            controller: require('controllers/homeCtr.js'),
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: './app/views/dashboard.html',
            controller: require('controllers/dashboardCtr.js'),
        })
       
	;

};

},{"controllers/dashboardCtr.js":3,"controllers/homeCtr.js":4,"controllers/mainCtr.js":5,"controllers/notfoundCtr.js":6,"controllers/user/forgotCtr.js":7,"controllers/user/loginCtr.js":8,"controllers/user/resetCtr.js":9,"controllers/user/signupCtr.js":10}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports = function HomeController($scope,$state,$window,$cookies) {

    $scope.location = "Home";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }

};
module.exports.$inject = ['$scope','$state','$window','$cookies'];
},{}],5:[function(require,module,exports){
module.exports = function MainController($scope,$state,$window,$cookies) {

    $scope.location = "Main";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }

};
module.exports.$inject = ['$scope','$state','$window','$cookies'];
},{}],6:[function(require,module,exports){
module.exports = function NotfoundController($scope) {
	
    $scope.location = "Notfound";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }


};
module.exports.$inject = ['$scope'];
},{}],7:[function(require,module,exports){
module.exports = function ForgotController($scope,$state) {

    $scope.location = "Login";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }
    
};
module.exports.$inject = ['$scope','$state'];
},{}],8:[function(require,module,exports){
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
        $scope.message = "";
        $scope.status = "";
        
        if($scope.user) {
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
        }else{
            $scope.message = "Fill all fields";
            $scope.status = "error";
        }

    }
    
    

};
module.exports.$inject = ['$scope','$state','$window','$cookies','Backend'];
},{}],9:[function(require,module,exports){
module.exports = function ResetCtr($scope,$state){

    $scope.location = "Login";

    $scope.init = init;
    $scope.init();

    function init(){
        console.log($scope.location);
    }

};
module.exports.$inject = ['$scope','$state'];
},{}],10:[function(require,module,exports){
module.exports = function SignupCtr($scope,$state,Backend){

    $scope.location = "Signup";

    $scope.error_msg = "";
    $scope.user = {};

    $scope.init = init;
    $scope.signUp = signUp;
    $scope.toggle = toggle;
    //$scope.showform = true;

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
},{}],11:[function(require,module,exports){
angular.module('MyApp', [
	'ui.router',
	'ngCookies',
	'ui.bootstrap',
	'ngMessages'
	])

	/** config application modules and routing */
    .config(require('./config.js'))

    /*factories:*/
    .factory('cookieInterceptor', require('./auth.js')['interceptor'])

	/**services*/
	.service('Backend', require('./services/Backend.js'))
		
    /*run:*/
    .run(require('./auth.js')['view_restriction'])
;
},{"./auth.js":1,"./config.js":2,"./services/Backend.js":12}],12:[function(require,module,exports){
module.exports = function ($q, $http, $cookies) {

    /** Do login fo user */
    this.login = function (data) {

        return $http.post('/api/user/login', data)
            .then(
                function (response) {
                    return response
                },
                function (err) {
                    console.log(err.message);
                    //$state.go('error', { 'error_obj': err });
                }
            )
    };

    /** do sign up for new user */
    this.signup = function (data) {

        return $http.post('/api/user/signup', data)
            .then(
                function (response) {
                    return response;
                },
                function (err) {
                    console.log(err.message);
                    //$state.go('error', { 'error_obj': err });
                }
            )
    };


    /** do test up for new user */
    this.test = function () {
        
        return $http.get('/api/user/test')
            .then(
                function (response) {
                    return response;
                },
                function (err) {
                    console.log(err.message);
                    //$state.go('error', { 'error_obj': err });
                }
            )
    };

};
module.exports.$inject = ['$q', '$http', '$cookies'];
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXV0aC5qcyIsImFwcC9jb25maWcuanMiLCJhcHAvY29udHJvbGxlcnMvZGFzaGJvYXJkQ3RyLmpzIiwiYXBwL2NvbnRyb2xsZXJzL2hvbWVDdHIuanMiLCJhcHAvY29udHJvbGxlcnMvbWFpbkN0ci5qcyIsImFwcC9jb250cm9sbGVycy9ub3Rmb3VuZEN0ci5qcyIsImFwcC9jb250cm9sbGVycy91c2VyL2ZvcmdvdEN0ci5qcyIsImFwcC9jb250cm9sbGVycy91c2VyL2xvZ2luQ3RyLmpzIiwiYXBwL2NvbnRyb2xsZXJzL3VzZXIvcmVzZXRDdHIuanMiLCJhcHAvY29udHJvbGxlcnMvdXNlci9zaWdudXBDdHIuanMiLCJhcHAvZW50cnkuanMiLCJhcHAvc2VydmljZXMvQmFja2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzLnZpZXdfcmVzdHJpY3Rpb24gPSBWaWV3UmVzdHJpY3Rpb247XHJcbm1vZHVsZS5leHBvcnRzLnZpZXdfcmVzdHJpY3Rpb24uJGluamVjdCA9IFsnJGh0dHAnLCAnJHN0YXRlJywgJyRyb290U2NvcGUnLCAnJGNvb2tpZXMnXTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdSZXN0cmljdGlvbigkaHR0cCwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkY29va2llcykge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hlY2sgaWYgdXNlciBkb24ndCBsb2dpblxyXG4gICAgICogbG9naW4gaGltIGtpa2UgZ3Vlc3RcclxuICAgICAqL1xyXG4gICAgLyppZiAoISRjb29raWVzLmdldE9iamVjdCgndG9rZW4nKSkge1xyXG4gICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgQmFja2VuZFNlcnZpY2UubG9naW5HdWVzdChkYXRhKS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICRjb29raWVzLnB1dE9iamVjdCgnand0JywgcmVzcG9uc2UuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSovXHJcblxyXG4gICAgXHJcbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuXHJcbiAgICAgICAgLyoqIGNoZWNrIGlmIHVzZXIgZGF0YSBleGlzdCAqL1xyXG4gICAgICAgIC8qdmFyIHVzZXIgPSBcIlwiO1xyXG4gICAgICAgIGlmKCRjb29raWVzLmdldE9iamVjdCgndG9rZW4nKSl7XHJcbiAgICAgICAgICAgIHVzZXIgPSBKU09OLnBhcnNlKGp3dEhlbHBlci5kZWNvZGVUb2tlbigkY29va2llcy5nZXRPYmplY3QoJ2p3dCcpKS51c2VyKTtcclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgLyoqIGhpZGUgc2lnbnVwIHBhZ2UgaWYgdXNlciBvbHJlZHkgbG9naW5lZCAqL1xyXG4gICAgICAgIGlmICh0b1N0YXRlWyduYW1lJ10gPT0gJ3NpZ251cCcpIHtcclxuICAgICAgICAgICAgaWYgKCRjb29raWVzLmdldCgnYXV0aCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdkYXNoYm9hcmQnKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogaGlkZSBsb2dpbiBwYWdlIGlmIHVzZXIgb2xyZWFkeSBsb2dpbiAqL1xyXG4gICAgICAgIGlmICh0b1N0YXRlWyduYW1lJ10gPT0gJ2xvZ2luJykge1xyXG4gICAgICAgICAgICBpZiAoJGNvb2tpZXMuZ2V0KCdhdXRoJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBjaGVjayBpZiB1c2VyIGNhbiBzZWUgcHJvZmlsZSBwYWdlICovXHJcbiAgICAgICAgaWYgKHRvU3RhdGVbJ25hbWUnXSA9PSAnZGFzaGJvYXJkJykge1xyXG4gICAgICAgICAgICBpZiAoISRjb29raWVzLmdldCgnYXV0aCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cy5pbnRlcmNlcHRvciA9IEludGVyY2VwdG9yO1xyXG5tb2R1bGUuZXhwb3J0cy5pbnRlcmNlcHRvci4kaW5qZWN0ID0gWyckaW5qZWN0b3InLCAnJHdpbmRvdycsICckcScsICckY29va2llcycsJyRyb290U2NvcGUnXTtcclxuXHJcblxyXG5mdW5jdGlvbiBJbnRlcmNlcHRvcigkaW5qZWN0b3IsICR3aW5kb3csICRxLCAkY29va2llcywkcm9vdFNjb3BlKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXF1ZXN0OiBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICgkY29va2llcy5nZXQoJ2F1dGgnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9ICRjb29raWVzLmdldCgnYXV0aCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNwb25zZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS50b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICRjb29raWVzLnB1dCgnYXV0aCcsIHJlc3BvbnNlLmRhdGEudG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvL2lmIDQwMyBcclxuICAgICAgICAgICAgLy9yZWRpcmVjdCB0byBwYWdlIGVycm9yIFxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7ICAvL2l0IGlzIHJlcXVpcmluZyB0byBwcm92aWRlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJywgJyRodHRwUHJvdmlkZXInXTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGh0dHBQcm92aWRlcil7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29va2llIHByb3RlY3Rpb25cclxuICAgICAqL1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnY29va2llSW50ZXJjZXB0b3InKTtcclxuXHJcblxyXG5cclxuXHQkdXJsUm91dGVyUHJvdmlkZXIud2hlbignJywnLycpO1xyXG5cclxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvNDA0Jyk7XHJcblxyXG4gICAgXHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHRcdC5zdGF0ZSgnNDA0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvNDA0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy9lcnJvcnMvNDA0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy9ub3Rmb3VuZEN0ci5qcycpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJzQwMycsIHtcclxuICAgICAgICAgICAgdXJsOiAnLzQwMycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvZXJyb3JzLzQwMy5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCc1MDAnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy81MDAnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL3ZpZXdzL2Vycm9ycy81MDAuaHRtbCdcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVc2VyIHN0YXRzXHJcbiAgICAgICAgICovXHJcblx0XHQuc3RhdGUoJ2xvZ2luJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL3ZpZXdzL3VzZXIvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3VzZXIvbG9naW5DdHIuanMnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdzaWdudXAnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL3ZpZXdzL3VzZXIvc2lnbnVwLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy91c2VyL3NpZ251cEN0ci5qcycpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2ZvcmdvdCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2ZvcmdvdCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvdXNlci9mb3Jnb3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3VzZXIvZm9yZ290Q3RyLmpzJylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgncmVzZXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9yZXNldCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvdXNlci9yZXNldC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci9yZXNldEN0ci5qcycpLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5zdGF0ZSgnbWFpbicsIHtcclxuICAgICAgICAgICAgdXJsOiAnJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy9tYWluLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy9tYWluQ3RyLmpzJyksXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLnN0YXRlKCdtYWluLmhvbWUnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL2hvbWVDdHIuanMnKSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvZGFzaGJvYXJkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy9kYXNoYm9hcmRDdHIuanMnKSxcclxuICAgICAgICB9KVxyXG4gICAgICAgXHJcblx0O1xyXG5cclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBEYXNoYm9hcmRDb250cm9sbGVyKCRzY29wZSwkc3RhdGUsQmFja2VuZCkge1xyXG5cclxuICAgICRzY29wZS5sb2NhdGlvbiA9IFwiRGFzaGJvYXJkXCI7XHJcblxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBCYWNrZW5kLnRlc3QoKS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywnJHN0YXRlJywnQmFja2VuZCddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSG9tZUNvbnRyb2xsZXIoJHNjb3BlLCRzdGF0ZSwkd2luZG93LCRjb29raWVzKSB7XHJcblxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJIb21lXCI7XHJcblxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsJyRzdGF0ZScsJyR3aW5kb3cnLCckY29va2llcyddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCRzdGF0ZSwkd2luZG93LCRjb29raWVzKSB7XHJcblxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJNYWluXCI7XHJcblxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsJyRzdGF0ZScsJyR3aW5kb3cnLCckY29va2llcyddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTm90Zm91bmRDb250cm9sbGVyKCRzY29wZSkge1xyXG5cdFxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJOb3Rmb3VuZFwiO1xyXG5cclxuICAgICRzY29wZS5pbml0ID0gaW5pdDtcclxuICAgICRzY29wZS5pbml0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBGb3Jnb3RDb250cm9sbGVyKCRzY29wZSwkc3RhdGUpIHtcclxuXHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIkxvZ2luXCI7XHJcblxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuICAgIFxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnLCckc3RhdGUnXTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIExvZ2luQ29udHJvbGxlcigkc2NvcGUsJHN0YXRlLCR3aW5kb3csJGNvb2tpZXMsQmFja2VuZCkge1xyXG5cclxuICAgICRzY29wZS5sb2NhdGlvbiA9IFwiTG9naW5cIjtcclxuXHJcbiAgICAkc2NvcGUubWVzc2FnZSA9IFwiXCI7XHJcbiAgICAkc2NvcGUudXNlciA9IHt9O1xyXG4gICAgXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUubG9naW4gPSBsb2dpbjtcclxuICAgICRzY29wZS50b2dnbGUgPSB0b2dnbGU7XHJcbiAgIC8vICRzY29wZS5zaG93Zm9ybSA9IHRydWU7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgICAgIHRvZ2dsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZSgpIHtcclxuICAgICAgICAkKCdmb3JtJykuYW5pbWF0ZSh7aGVpZ2h0OiBcInRvZ2dsZVwiLCBvcGFjaXR5OiBcInRvZ2dsZVwifSwgXCJzbG93XCIpLnByb21pc2UoKS50aGVuKFxyXG4gICAgICAgIGZ1bmN0aW9uKHIpe1xyXG4gICAgICAgICAgICAvLyRzY29wZS5zaG93Zm9ybSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBsb2dpbigpIHtcclxuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoJHNjb3BlLnVzZXIpIHtcclxuICAgICAgICAgICAgQmFja2VuZC5sb2dpbigkc2NvcGUudXNlcikudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmKCFyZXNwb25zZS5kYXRhLkVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSByZXNwb25zZS5kYXRhLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSBcImVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSBcImVycm9yXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJGaWxsIGFsbCBmaWVsZHNcIjtcclxuICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiZXJyb3JcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsJyRzdGF0ZScsJyR3aW5kb3cnLCckY29va2llcycsJ0JhY2tlbmQnXTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc2V0Q3RyKCRzY29wZSwkc3RhdGUpe1xyXG5cclxuICAgICRzY29wZS5sb2NhdGlvbiA9IFwiTG9naW5cIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywnJHN0YXRlJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTaWdudXBDdHIoJHNjb3BlLCRzdGF0ZSxCYWNrZW5kKXtcclxuXHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIlNpZ251cFwiO1xyXG5cclxuICAgICRzY29wZS5lcnJvcl9tc2cgPSBcIlwiO1xyXG4gICAgJHNjb3BlLnVzZXIgPSB7fTtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuc2lnblVwID0gc2lnblVwO1xyXG4gICAgJHNjb3BlLnRvZ2dsZSA9IHRvZ2dsZTtcclxuICAgIC8vJHNjb3BlLnNob3dmb3JtID0gdHJ1ZTtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgICAgIHRvZ2dsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlKCkge1xyXG4gICAgICAgICQoJ2Zvcm0nKS5hbmltYXRlKHtoZWlnaHQ6IFwidG9nZ2xlXCIsIG9wYWNpdHk6IFwidG9nZ2xlXCJ9LCBcInNsb3dcIikucHJvbWlzZSgpLnRoZW4oXHJcbiAgICAgICAgZnVuY3Rpb24ocil7XHJcbiAgICAgICAgICAgIC8vJHNjb3BlLnNob3dmb3JtID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHNpZ25VcCgpIHtcclxuICAgICAgICAkc2NvcGUuZXJyb3JfbXNnID0gXCJcIjtcclxuICAgICAgICBcclxuICAgICAgICBpZigkc2NvcGUudXNlci5uYW1lICYmXHJcbiAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkICYmXHJcbiAgICAgICAgICAgICRzY29wZS51c2VyLmVtYWlsICYmXHJcbiAgICAgICAgICAgICgkc2NvcGUudXNlci5wYXNzd29yZCA9PSAkc2NvcGUudXNlci5yZXBhc3N3b3JkKSl7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICBkYXRhLm5hbWUgPSAkc2NvcGUudXNlci5uYW1lO1xyXG4gICAgICAgICAgICBkYXRhLmVtYWlsID0gJHNjb3BlLnVzZXIuZW1haWw7XHJcbiAgICAgICAgICAgIGRhdGEucGFzc3dvcmQgPSAkc2NvcGUudXNlci5wYXNzd29yZDtcclxuXHJcbiAgICAgICAgICAgIEJhY2tlbmQuc2lnbnVwKGRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5FcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKFwibG9naW5cIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JfbXNnID0gcmVzcG9uc2UuZGF0YS5FcnJvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JfbXNnID0gZXJyLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnLCckc3RhdGUnLCdCYWNrZW5kJ107IiwiYW5ndWxhci5tb2R1bGUoJ015QXBwJywgW1xyXG5cdCd1aS5yb3V0ZXInLFxyXG5cdCduZ0Nvb2tpZXMnLFxyXG5cdCd1aS5ib290c3RyYXAnLFxyXG5cdCduZ01lc3NhZ2VzJ1xyXG5cdF0pXHJcblxyXG5cdC8qKiBjb25maWcgYXBwbGljYXRpb24gbW9kdWxlcyBhbmQgcm91dGluZyAqL1xyXG4gICAgLmNvbmZpZyhyZXF1aXJlKCcuL2NvbmZpZy5qcycpKVxyXG5cclxuICAgIC8qZmFjdG9yaWVzOiovXHJcbiAgICAuZmFjdG9yeSgnY29va2llSW50ZXJjZXB0b3InLCByZXF1aXJlKCcuL2F1dGguanMnKVsnaW50ZXJjZXB0b3InXSlcclxuXHJcblx0Lyoqc2VydmljZXMqL1xyXG5cdC5zZXJ2aWNlKCdCYWNrZW5kJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9CYWNrZW5kLmpzJykpXHJcblx0XHRcclxuICAgIC8qcnVuOiovXHJcbiAgICAucnVuKHJlcXVpcmUoJy4vYXV0aC5qcycpWyd2aWV3X3Jlc3RyaWN0aW9uJ10pXHJcbjsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkcSwgJGh0dHAsICRjb29raWVzKSB7XHJcblxyXG4gICAgLyoqIERvIGxvZ2luIGZvIHVzZXIgKi9cclxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS91c2VyL2xvZ2luJywgZGF0YSlcclxuICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogZG8gc2lnbiB1cCBmb3IgbmV3IHVzZXIgKi9cclxuICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlci9zaWdudXAnLCBkYXRhKVxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqIGRvIHRlc3QgdXAgZm9yIG5ldyB1c2VyICovXHJcbiAgICB0aGlzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS91c2VyL3Rlc3QnKVxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfTtcclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRxJywgJyRodHRwJywgJyRjb29raWVzJ107Il19
