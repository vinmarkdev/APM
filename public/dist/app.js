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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXV0aC5qcyIsImFwcC9jb25maWcuanMiLCJhcHAvY29udHJvbGxlcnMvZGFzaGJvYXJkQ3RyLmpzIiwiYXBwL2NvbnRyb2xsZXJzL2hvbWVDdHIuanMiLCJhcHAvY29udHJvbGxlcnMvbWFpbkN0ci5qcyIsImFwcC9jb250cm9sbGVycy9ub3Rmb3VuZEN0ci5qcyIsImFwcC9jb250cm9sbGVycy91c2VyL2ZvcmdvdEN0ci5qcyIsImFwcC9jb250cm9sbGVycy91c2VyL2xvZ2luQ3RyLmpzIiwiYXBwL2NvbnRyb2xsZXJzL3VzZXIvcmVzZXRDdHIuanMiLCJhcHAvY29udHJvbGxlcnMvdXNlci9zaWdudXBDdHIuanMiLCJhcHAvZW50cnkuanMiLCJhcHAvc2VydmljZXMvQmFja2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cy52aWV3X3Jlc3RyaWN0aW9uID0gVmlld1Jlc3RyaWN0aW9uO1xyXG5tb2R1bGUuZXhwb3J0cy52aWV3X3Jlc3RyaWN0aW9uLiRpbmplY3QgPSBbJyRodHRwJywgJyRzdGF0ZScsICckcm9vdFNjb3BlJywgJyRjb29raWVzJ107XHJcblxyXG5mdW5jdGlvbiBWaWV3UmVzdHJpY3Rpb24oJGh0dHAsICRzdGF0ZSwgJHJvb3RTY29wZSwgJGNvb2tpZXMpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoZWNrIGlmIHVzZXIgZG9uJ3QgbG9naW5cclxuICAgICAqIGxvZ2luIGhpbSBraWtlIGd1ZXN0XHJcbiAgICAgKi9cclxuICAgIC8qaWYgKCEkY29va2llcy5nZXRPYmplY3QoJ3Rva2VuJykpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgIEJhY2tlbmRTZXJ2aWNlLmxvZ2luR3Vlc3QoZGF0YSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY29va2llcy5wdXRPYmplY3QoJ2p3dCcsIHJlc3BvbnNlLmRhdGEudG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0qL1xyXG5cclxuICAgIFxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcblxyXG4gICAgICAgIC8qKiBjaGVjayBpZiB1c2VyIGRhdGEgZXhpc3QgKi9cclxuICAgICAgICAvKnZhciB1c2VyID0gXCJcIjtcclxuICAgICAgICBpZigkY29va2llcy5nZXRPYmplY3QoJ3Rva2VuJykpe1xyXG4gICAgICAgICAgICB1c2VyID0gSlNPTi5wYXJzZShqd3RIZWxwZXIuZGVjb2RlVG9rZW4oJGNvb2tpZXMuZ2V0T2JqZWN0KCdqd3QnKSkudXNlcik7XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIC8qKiBoaWRlIHNpZ251cCBwYWdlIGlmIHVzZXIgb2xyZWR5IGxvZ2luZWQgKi9cclxuICAgICAgICBpZiAodG9TdGF0ZVsnbmFtZSddID09ICdzaWdudXAnKSB7XHJcbiAgICAgICAgICAgIGlmICgkY29va2llcy5nZXQoJ2F1dGgnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZGFzaGJvYXJkJyk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIGhpZGUgbG9naW4gcGFnZSBpZiB1c2VyIG9scmVhZHkgbG9naW4gKi9cclxuICAgICAgICBpZiAodG9TdGF0ZVsnbmFtZSddID09ICdsb2dpbicpIHtcclxuICAgICAgICAgICAgaWYgKCRjb29raWVzLmdldCgnYXV0aCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdkYXNoYm9hcmQnKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogY2hlY2sgaWYgdXNlciBjYW4gc2VlIHByb2ZpbGUgcGFnZSAqL1xyXG4gICAgICAgIGlmICh0b1N0YXRlWyduYW1lJ10gPT0gJ2Rhc2hib2FyZCcpIHtcclxuICAgICAgICAgICAgaWYgKCEkY29va2llcy5nZXQoJ2F1dGgnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMuaW50ZXJjZXB0b3IgPSBJbnRlcmNlcHRvcjtcclxubW9kdWxlLmV4cG9ydHMuaW50ZXJjZXB0b3IuJGluamVjdCA9IFsnJGluamVjdG9yJywgJyR3aW5kb3cnLCAnJHEnLCAnJGNvb2tpZXMnLCckcm9vdFNjb3BlJ107XHJcblxyXG5cclxuZnVuY3Rpb24gSW50ZXJjZXB0b3IoJGluamVjdG9yLCAkd2luZG93LCAkcSwgJGNvb2tpZXMsJHJvb3RTY29wZSkge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWVzdDogZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoJGNvb2tpZXMuZ2V0KCdhdXRoJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSAkY29va2llcy5nZXQoJ2F1dGgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEudG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAkY29va2llcy5wdXQoJ2F1dGgnLCByZXNwb25zZS5kYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy9pZiA0MDMgXHJcbiAgICAgICAgICAgIC8vcmVkaXJlY3QgdG8gcGFnZSBlcnJvciBcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlOyAgLy9pdCBpcyByZXF1aXJpbmcgdG8gcHJvdmlkZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsICckaHR0cFByb3ZpZGVyJ107XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRodHRwUHJvdmlkZXIpe1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvb2tpZSBwcm90ZWN0aW9uXHJcbiAgICAgKi9cclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2Nvb2tpZUludGVyY2VwdG9yJyk7XHJcblxyXG5cclxuXHJcblx0JHVybFJvdXRlclByb3ZpZGVyLndoZW4oJycsJy8nKTtcclxuXHJcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLzQwNCcpO1xyXG5cclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdFx0LnN0YXRlKCc0MDQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy80MDQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL3ZpZXdzL2Vycm9ycy80MDQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL25vdGZvdW5kQ3RyLmpzJylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnNDAzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvNDAzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy9lcnJvcnMvNDAzLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJzUwMCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnLzUwMCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvZXJyb3JzLzUwMC5odG1sJ1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVzZXIgc3RhdHNcclxuICAgICAgICAgKi9cclxuXHRcdC5zdGF0ZSgnbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvdXNlci9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci9sb2dpbkN0ci5qcycpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3NpZ251cCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvdXNlci9zaWdudXAuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3VzZXIvc2lnbnVwQ3RyLmpzJylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZm9yZ290Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZm9yZ290JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy91c2VyL2ZvcmdvdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci9mb3Jnb3RDdHIuanMnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdyZXNldCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3Jlc2V0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy91c2VyL3Jlc2V0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy91c2VyL3Jlc2V0Q3RyLmpzJyksXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLnN0YXRlKCdtYWluJywge1xyXG4gICAgICAgICAgICB1cmw6ICcnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL3ZpZXdzL21haW4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL21haW5DdHIuanMnKSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAuc3RhdGUoJ21haW4uaG9tZScsIHtcclxuICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvaG9tZUN0ci5qcycpLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL2Rhc2hib2FyZEN0ci5qcycpLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuXHQ7XHJcblxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERhc2hib2FyZENvbnRyb2xsZXIoJHNjb3BlLCRzdGF0ZSxCYWNrZW5kKSB7XHJcblxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJEYXNoYm9hcmRcIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIEJhY2tlbmQudGVzdCgpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBcclxuICAgIH0pXHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnLCckc3RhdGUnLCdCYWNrZW5kJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBIb21lQ29udHJvbGxlcigkc2NvcGUsJHN0YXRlLCR3aW5kb3csJGNvb2tpZXMpIHtcclxuXHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIkhvbWVcIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywnJHN0YXRlJywnJHdpbmRvdycsJyRjb29raWVzJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsJHN0YXRlLCR3aW5kb3csJGNvb2tpZXMpIHtcclxuXHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIk1haW5cIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywnJHN0YXRlJywnJHdpbmRvdycsJyRjb29raWVzJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBOb3Rmb3VuZENvbnRyb2xsZXIoJHNjb3BlKSB7XHJcblx0XHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIk5vdGZvdW5kXCI7XHJcblxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnXTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEZvcmdvdENvbnRyb2xsZXIoJHNjb3BlLCRzdGF0ZSkge1xyXG5cclxuICAgICRzY29wZS5sb2NhdGlvbiA9IFwiTG9naW5cIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsJyRzdGF0ZSddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTG9naW5Db250cm9sbGVyKCRzY29wZSwkc3RhdGUsJHdpbmRvdywkY29va2llcyxCYWNrZW5kKSB7XHJcblxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJMb2dpblwiO1xyXG5cclxuICAgICRzY29wZS51c2VyID0ge307XHJcbiAgICBcclxuICAgICRzY29wZS5pbml0ID0gaW5pdDtcclxuICAgICRzY29wZS5sb2dpbiA9IGxvZ2luO1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2dpbigpIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBCYWNrZW5kLmxvZ2luKCRzY29wZS51c2VyKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5FcnJvcil7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnLCckc3RhdGUnLCckd2luZG93JywnJGNvb2tpZXMnLCdCYWNrZW5kJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNldEN0cigkc2NvcGUsJHN0YXRlKXtcclxuXHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIkxvZ2luXCI7XHJcblxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsJyRzdGF0ZSddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2lnbnVwQ3RyKCRzY29wZSwkc3RhdGUsQmFja2VuZCl7XHJcblxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJTaWdudXBcIjtcclxuXHJcbiAgICAkc2NvcGUuZXJyb3JfbXNnID0gXCJcIjtcclxuICAgICRzY29wZS51c2VyID0ge307XHJcblxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLnNpZ25VcCA9IHNpZ25VcDtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25VcCgpIHtcclxuICAgICAgICAkc2NvcGUuZXJyb3JfbXNnID0gXCJcIjtcclxuICAgICAgICBcclxuICAgICAgICBpZigkc2NvcGUudXNlci5uYW1lICYmXHJcbiAgICAgICAgICAgICRzY29wZS51c2VyLnBhc3N3b3JkICYmXHJcbiAgICAgICAgICAgICRzY29wZS51c2VyLmVtYWlsICYmXHJcbiAgICAgICAgICAgICgkc2NvcGUudXNlci5wYXNzd29yZCA9PSAkc2NvcGUudXNlci5yZXBhc3N3b3JkKSl7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICBkYXRhLm5hbWUgPSAkc2NvcGUudXNlci5uYW1lO1xyXG4gICAgICAgICAgICBkYXRhLmVtYWlsID0gJHNjb3BlLnVzZXIuZW1haWw7XHJcbiAgICAgICAgICAgIGRhdGEucGFzc3dvcmQgPSAkc2NvcGUudXNlci5wYXNzd29yZDtcclxuXHJcbiAgICAgICAgICAgIEJhY2tlbmQuc2lnbnVwKGRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5FcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKFwibG9naW5cIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JfbXNnID0gcmVzcG9uc2UuZGF0YS5FcnJvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JfbXNnID0gZXJyLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnLCckc3RhdGUnLCdCYWNrZW5kJ107IiwiYW5ndWxhci5tb2R1bGUoJ015QXBwJywgW1xyXG5cdCd1aS5yb3V0ZXInLFxyXG5cdCduZ0Nvb2tpZXMnLFxyXG5cdCd1aS5ib290c3RyYXAnLFxyXG5cdCduZ01lc3NhZ2VzJ1xyXG5cdF0pXHJcblxyXG5cdC8qKiBjb25maWcgYXBwbGljYXRpb24gbW9kdWxlcyBhbmQgcm91dGluZyAqL1xyXG4gICAgLmNvbmZpZyhyZXF1aXJlKCcuL2NvbmZpZy5qcycpKVxyXG5cclxuICAgIC8qZmFjdG9yaWVzOiovXHJcbiAgICAuZmFjdG9yeSgnY29va2llSW50ZXJjZXB0b3InLCByZXF1aXJlKCcuL2F1dGguanMnKVsnaW50ZXJjZXB0b3InXSlcclxuXHJcblx0Lyoqc2VydmljZXMqL1xyXG5cdC5zZXJ2aWNlKCdCYWNrZW5kJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9CYWNrZW5kLmpzJykpXHJcblx0XHRcclxuICAgIC8qcnVuOiovXHJcbiAgICAucnVuKHJlcXVpcmUoJy4vYXV0aC5qcycpWyd2aWV3X3Jlc3RyaWN0aW9uJ10pXHJcbjsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkcSwgJGh0dHAsICRjb29raWVzKSB7XHJcblxyXG4gICAgLyoqIERvIGxvZ2luIGZvIHVzZXIgKi9cclxuICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS91c2VyL2xvZ2luJywgZGF0YSlcclxuICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogZG8gc2lnbiB1cCBmb3IgbmV3IHVzZXIgKi9cclxuICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlci9zaWdudXAnLCBkYXRhKVxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqIGRvIHRlc3QgdXAgZm9yIG5ldyB1c2VyICovXHJcbiAgICB0aGlzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS91c2VyL3Rlc3QnKVxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vJHN0YXRlLmdvKCdlcnJvcicsIHsgJ2Vycm9yX29iaic6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfTtcclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRxJywgJyRodHRwJywgJyRjb29raWVzJ107Il19
