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