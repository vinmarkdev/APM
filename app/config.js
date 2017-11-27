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
