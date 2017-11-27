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