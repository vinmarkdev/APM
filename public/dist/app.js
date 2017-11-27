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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXV0aC5qcyIsImFwcC9jb25maWcuanMiLCJhcHAvY29udHJvbGxlcnMvZGFzaGJvYXJkQ3RyLmpzIiwiYXBwL2NvbnRyb2xsZXJzL2hvbWVDdHIuanMiLCJhcHAvY29udHJvbGxlcnMvbWFpbkN0ci5qcyIsImFwcC9jb250cm9sbGVycy9ub3Rmb3VuZEN0ci5qcyIsImFwcC9jb250cm9sbGVycy91c2VyL2ZvcmdvdEN0ci5qcyIsImFwcC9jb250cm9sbGVycy91c2VyL2xvZ2luQ3RyLmpzIiwiYXBwL2NvbnRyb2xsZXJzL3VzZXIvcmVzZXRDdHIuanMiLCJhcHAvY29udHJvbGxlcnMvdXNlci9zaWdudXBDdHIuanMiLCJhcHAvZW50cnkuanMiLCJhcHAvc2VydmljZXMvQmFja2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMudmlld19yZXN0cmljdGlvbiA9IFZpZXdSZXN0cmljdGlvbjtcclxubW9kdWxlLmV4cG9ydHMudmlld19yZXN0cmljdGlvbi4kaW5qZWN0ID0gWyckaHR0cCcsICckc3RhdGUnLCAnJHJvb3RTY29wZScsICckY29va2llcyddO1xyXG5cclxuZnVuY3Rpb24gVmlld1Jlc3RyaWN0aW9uKCRodHRwLCAkc3RhdGUsICRyb290U2NvcGUsICRjb29raWVzKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVjayBpZiB1c2VyIGRvbid0IGxvZ2luXHJcbiAgICAgKiBsb2dpbiBoaW0ga2lrZSBndWVzdFxyXG4gICAgICovXHJcbiAgICAvKmlmICghJGNvb2tpZXMuZ2V0T2JqZWN0KCd0b2tlbicpKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICBCYWNrZW5kU2VydmljZS5sb2dpbkd1ZXN0KGRhdGEpLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvb2tpZXMucHV0T2JqZWN0KCdqd3QnLCByZXNwb25zZS5kYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBcclxuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG5cclxuICAgICAgICAvKiogY2hlY2sgaWYgdXNlciBkYXRhIGV4aXN0ICovXHJcbiAgICAgICAgLyp2YXIgdXNlciA9IFwiXCI7XHJcbiAgICAgICAgaWYoJGNvb2tpZXMuZ2V0T2JqZWN0KCd0b2tlbicpKXtcclxuICAgICAgICAgICAgdXNlciA9IEpTT04ucGFyc2Uoand0SGVscGVyLmRlY29kZVRva2VuKCRjb29raWVzLmdldE9iamVjdCgnand0JykpLnVzZXIpO1xyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICAvKiogaGlkZSBzaWdudXAgcGFnZSBpZiB1c2VyIG9scmVkeSBsb2dpbmVkICovXHJcbiAgICAgICAgaWYgKHRvU3RhdGVbJ25hbWUnXSA9PSAnc2lnbnVwJykge1xyXG4gICAgICAgICAgICBpZiAoJGNvb2tpZXMuZ2V0KCdhdXRoJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBoaWRlIGxvZ2luIHBhZ2UgaWYgdXNlciBvbHJlYWR5IGxvZ2luICovXHJcbiAgICAgICAgaWYgKHRvU3RhdGVbJ25hbWUnXSA9PSAnbG9naW4nKSB7XHJcbiAgICAgICAgICAgIGlmICgkY29va2llcy5nZXQoJ2F1dGgnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZGFzaGJvYXJkJyk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIGNoZWNrIGlmIHVzZXIgY2FuIHNlZSBwcm9maWxlIHBhZ2UgKi9cclxuICAgICAgICBpZiAodG9TdGF0ZVsnbmFtZSddID09ICdkYXNoYm9hcmQnKSB7XHJcbiAgICAgICAgICAgIGlmICghJGNvb2tpZXMuZ2V0KCdhdXRoJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzLmludGVyY2VwdG9yID0gSW50ZXJjZXB0b3I7XHJcbm1vZHVsZS5leHBvcnRzLmludGVyY2VwdG9yLiRpbmplY3QgPSBbJyRpbmplY3RvcicsICckd2luZG93JywgJyRxJywgJyRjb29raWVzJywnJHJvb3RTY29wZSddO1xyXG5cclxuXHJcbmZ1bmN0aW9uIEludGVyY2VwdG9yKCRpbmplY3RvciwgJHdpbmRvdywgJHEsICRjb29raWVzLCRyb290U2NvcGUpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCRjb29raWVzLmdldCgnYXV0aCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gJGNvb2tpZXMuZ2V0KCdhdXRoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvb2tpZXMucHV0KCdhdXRoJywgcmVzcG9uc2UuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vaWYgNDAzIFxyXG4gICAgICAgICAgICAvL3JlZGlyZWN0IHRvIHBhZ2UgZXJyb3IgXHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTsgIC8vaXQgaXMgcmVxdWlyaW5nIHRvIHByb3ZpZGVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLCAnJGh0dHBQcm92aWRlciddO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKXtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb29raWUgcHJvdGVjdGlvblxyXG4gICAgICovXHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdjb29raWVJbnRlcmNlcHRvcicpO1xyXG5cclxuXHJcblxyXG5cdCR1cmxSb3V0ZXJQcm92aWRlci53aGVuKCcnLCcvJyk7XHJcblxyXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy80MDQnKTtcclxuXHJcbiAgICBcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdFx0LnN0YXRlKCc0MDQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy80MDQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL3ZpZXdzL2Vycm9ycy80MDQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL25vdGZvdW5kQ3RyLmpzJylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnNDAzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvNDAzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy9lcnJvcnMvNDAzLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJzUwMCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnLzUwMCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvZXJyb3JzLzUwMC5odG1sJ1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVzZXIgc3RhdHNcclxuICAgICAgICAgKi9cclxuXHRcdC5zdGF0ZSgnbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvdXNlci9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci9sb2dpbkN0ci5qcycpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3NpZ251cCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvdXNlci9zaWdudXAuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3VzZXIvc2lnbnVwQ3RyLmpzJylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZm9yZ290Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZm9yZ290JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy91c2VyL2ZvcmdvdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci9mb3Jnb3RDdHIuanMnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdyZXNldCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3Jlc2V0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy91c2VyL3Jlc2V0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy91c2VyL3Jlc2V0Q3RyLmpzJyksXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLnN0YXRlKCdtYWluJywge1xyXG4gICAgICAgICAgICB1cmw6ICcnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL3ZpZXdzL21haW4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL21haW5DdHIuanMnKSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAuc3RhdGUoJ21haW4uaG9tZScsIHtcclxuICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvaG9tZUN0ci5qcycpLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL2Rhc2hib2FyZEN0ci5qcycpLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuXHQ7XHJcblxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERhc2hib2FyZENvbnRyb2xsZXIoJHNjb3BlLCRzdGF0ZSxCYWNrZW5kKSB7XHJcblxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJEYXNoYm9hcmRcIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIEJhY2tlbmQudGVzdCgpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBcclxuICAgIH0pXHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnLCckc3RhdGUnLCdCYWNrZW5kJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBIb21lQ29udHJvbGxlcigkc2NvcGUsJHN0YXRlLCR3aW5kb3csJGNvb2tpZXMpIHtcclxuXHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIkhvbWVcIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywnJHN0YXRlJywnJHdpbmRvdycsJyRjb29raWVzJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsJHN0YXRlLCR3aW5kb3csJGNvb2tpZXMpIHtcclxuXHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIk1haW5cIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywnJHN0YXRlJywnJHdpbmRvdycsJyRjb29raWVzJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBOb3Rmb3VuZENvbnRyb2xsZXIoJHNjb3BlKSB7XHJcblx0XHJcbiAgICAkc2NvcGUubG9jYXRpb24gPSBcIk5vdGZvdW5kXCI7XHJcblxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnXTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEZvcmdvdENvbnRyb2xsZXIoJHNjb3BlLCRzdGF0ZSkge1xyXG5cclxuICAgICRzY29wZS5sb2NhdGlvbiA9IFwiTG9naW5cIjtcclxuXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsJyRzdGF0ZSddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTG9naW5Db250cm9sbGVyKCRzY29wZSwkc3RhdGUsJHdpbmRvdywkY29va2llcyxCYWNrZW5kKSB7XHJcblxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJMb2dpblwiO1xyXG5cclxuICAgICRzY29wZS5lcnJvcl9tc2cgPSBcIlwiO1xyXG4gICAgJHNjb3BlLnVzZXIgPSB7fTtcclxuICAgIFxyXG4gICAgJHNjb3BlLmluaXQgPSBpbml0O1xyXG4gICAgJHNjb3BlLmxvZ2luID0gbG9naW47XHJcbiAgICAkc2NvcGUudG9nZ2xlID0gdG9nZ2xlO1xyXG4gICAvLyAkc2NvcGUuc2hvd2Zvcm0gPSB0cnVlO1xyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmxvY2F0aW9uKTtcclxuICAgICAgICB0b2dnbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHRvZ2dsZSgpIHtcclxuICAgICAgICAkKCdmb3JtJykuYW5pbWF0ZSh7aGVpZ2h0OiBcInRvZ2dsZVwiLCBvcGFjaXR5OiBcInRvZ2dsZVwifSwgXCJzbG93XCIpLnByb21pc2UoKS50aGVuKFxyXG4gICAgICAgIGZ1bmN0aW9uKHIpe1xyXG4gICAgICAgICAgICAvLyRzY29wZS5zaG93Zm9ybSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBsb2dpbigpIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBCYWNrZW5kLmxvZ2luKCRzY29wZS51c2VyKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5FcnJvcil7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywnJHN0YXRlJywnJHdpbmRvdycsJyRjb29raWVzJywnQmFja2VuZCddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzZXRDdHIoJHNjb3BlLCRzdGF0ZSl7XHJcblxyXG4gICAgJHNjb3BlLmxvY2F0aW9uID0gXCJMb2dpblwiO1xyXG5cclxuICAgICRzY29wZS5pbml0ID0gaW5pdDtcclxuICAgICRzY29wZS5pbml0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5sb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnLCckc3RhdGUnXTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFNpZ251cEN0cigkc2NvcGUsJHN0YXRlLEJhY2tlbmQpe1xyXG5cclxuICAgICRzY29wZS5sb2NhdGlvbiA9IFwiU2lnbnVwXCI7XHJcblxyXG4gICAgJHNjb3BlLmVycm9yX21zZyA9IFwiXCI7XHJcbiAgICAkc2NvcGUudXNlciA9IHt9O1xyXG5cclxuICAgICRzY29wZS5pbml0ID0gaW5pdDtcclxuICAgICRzY29wZS5zaWduVXAgPSBzaWduVXA7XHJcbiAgICAkc2NvcGUudG9nZ2xlID0gdG9nZ2xlO1xyXG4gICAgLy8kc2NvcGUuc2hvd2Zvcm0gPSB0cnVlO1xyXG5cclxuICAgICRzY29wZS5pbml0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5sb2NhdGlvbik7XHJcbiAgICAgICAgdG9nZ2xlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiB0b2dnbGUoKSB7XHJcbiAgICAgICAgJCgnZm9ybScpLmFuaW1hdGUoe2hlaWdodDogXCJ0b2dnbGVcIiwgb3BhY2l0eTogXCJ0b2dnbGVcIn0sIFwic2xvd1wiKS5wcm9taXNlKCkudGhlbihcclxuICAgICAgICBmdW5jdGlvbihyKXtcclxuICAgICAgICAgICAgLy8kc2NvcGUuc2hvd2Zvcm0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gc2lnblVwKCkge1xyXG4gICAgICAgICRzY29wZS5lcnJvcl9tc2cgPSBcIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCRzY29wZS51c2VyLm5hbWUgJiZcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXIucGFzc3dvcmQgJiZcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXIuZW1haWwgJiZcclxuICAgICAgICAgICAgKCRzY29wZS51c2VyLnBhc3N3b3JkID09ICRzY29wZS51c2VyLnJlcGFzc3dvcmQpKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgIGRhdGEubmFtZSA9ICRzY29wZS51c2VyLm5hbWU7XHJcbiAgICAgICAgICAgIGRhdGEuZW1haWwgPSAkc2NvcGUudXNlci5lbWFpbDtcclxuICAgICAgICAgICAgZGF0YS5wYXNzd29yZCA9ICRzY29wZS51c2VyLnBhc3N3b3JkO1xyXG5cclxuICAgICAgICAgICAgQmFja2VuZC5zaWdudXAoZGF0YSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmKCFyZXNwb25zZS5kYXRhLkVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oXCJsb2dpblwiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvcl9tc2cgPSByZXNwb25zZS5kYXRhLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvcl9tc2cgPSBlcnIubWVzc2FnZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsJyRzdGF0ZScsJ0JhY2tlbmQnXTsiLCJhbmd1bGFyLm1vZHVsZSgnTXlBcHAnLCBbXHJcblx0J3VpLnJvdXRlcicsXHJcblx0J25nQ29va2llcycsXHJcblx0J3VpLmJvb3RzdHJhcCcsXHJcblx0J25nTWVzc2FnZXMnXHJcblx0XSlcclxuXHJcblx0LyoqIGNvbmZpZyBhcHBsaWNhdGlvbiBtb2R1bGVzIGFuZCByb3V0aW5nICovXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29uZmlnLmpzJykpXHJcblxyXG4gICAgLypmYWN0b3JpZXM6Ki9cclxuICAgIC5mYWN0b3J5KCdjb29raWVJbnRlcmNlcHRvcicsIHJlcXVpcmUoJy4vYXV0aC5qcycpWydpbnRlcmNlcHRvciddKVxyXG5cclxuXHQvKipzZXJ2aWNlcyovXHJcblx0LnNlcnZpY2UoJ0JhY2tlbmQnLCByZXF1aXJlKCcuL3NlcnZpY2VzL0JhY2tlbmQuanMnKSlcclxuXHRcdFxyXG4gICAgLypydW46Ki9cclxuICAgIC5ydW4ocmVxdWlyZSgnLi9hdXRoLmpzJylbJ3ZpZXdfcmVzdHJpY3Rpb24nXSlcclxuOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRxLCAkaHR0cCwgJGNvb2tpZXMpIHtcclxuXHJcbiAgICAvKiogRG8gbG9naW4gZm8gdXNlciAqL1xyXG4gICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzZXIvbG9naW4nLCBkYXRhKVxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBkbyBzaWduIHVwIGZvciBuZXcgdXNlciAqL1xyXG4gICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS91c2VyL3NpZ251cCcsIGRhdGEpXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKiogZG8gdGVzdCB1cCBmb3IgbmV3IHVzZXIgKi9cclxuICAgIHRoaXMudGVzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXIvdGVzdCcpXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kc3RhdGUuZ28oJ2Vycm9yJywgeyAnZXJyb3Jfb2JqJzogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICB9O1xyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHEnLCAnJGh0dHAnLCAnJGNvb2tpZXMnXTsiXX0=
