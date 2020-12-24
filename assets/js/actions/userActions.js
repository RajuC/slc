import { userConstants } from '../constants/userConstants';
import { userService } from '../services/userService';
// import { alertActions } from './alertActions';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    userLogout,
    register,
    getAll,
    updateUserDetails,
    updateUserPwdDetails,
    delete: _delete
};

function login(loginDetails, path) {
    return dispatch => {
        dispatch(request({ loginDetails }));

        userService.login(loginDetails)
            .then(
                user => { 
                    dispatch(success(user));
                    console.log("login users success", user);
                    history.push(path);
                    // dispatch(alertActions.success('Login successfull'));
                },
                error => {
                    console.log("error", error);
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                    // history.push("/login");
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}



function userLogout(path) {
    return dispatch => {
        userService.logout();
        dispatch(logout());
        console.log("user Logout success");
        history.push(path);
        // dispatch(alertActions.success('Logout successfull'));
    };
    function logout() { return { type: userConstants.LOGOUT } } 
}


function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function register(user, path) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(loginSuccess(user));
                    console.log("register user success", user);
                    history.push(path);
                    console.log("after home page", user, path);
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    // history.push("/register");
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function loginSuccess(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function updateUserDetails(user, path) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(loginSuccess(user));
                    console.log("register user success", user);
                    history.push(path);
                    console.log("after home page", user, path);
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function loginSuccess(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function updateUserPwdDetails(user, path) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(loginSuccess(user));
                    console.log("register user success", user);
                    history.push(path);
                    console.log("after home page", user, path);
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function loginSuccess(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}




function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}




function addUserRegisterValidations(postAdValidationDetails) {
    return {
      type: postAdConstants.ADD_POSTAD_VALIDATIONS,
      postAdValidationDetails,
    };
}