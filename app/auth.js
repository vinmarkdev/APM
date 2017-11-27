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
