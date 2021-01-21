import config from 'config';
import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    listUsers,
    getAdById,
    getUser,
    updateUserDetails,
    updateUserPassword,
    deleteUser
};


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/api/v1/sign_up`, requestOptions)
    .then(handleResponse)
    .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('slc_user', JSON.stringify(user));
    return user;
    });
}


function login(loginDetails) {
    console.log("=================Http req api login details", loginDetails);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails)
    };

    return fetch(`${config.apiUrl}/api/v1/sign_in`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('slc_user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    console.log("(fileName)========================== user service logout" );
    localStorage.removeItem('slc_user');
    console.log("(user after logout )========================== user", localStorage.getItem("slc_user"));
}

function listUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/v1/users`, requestOptions).then(handleResponse);
}

function getAdById(user_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/v1/users/${user_id}`, requestOptions).then(handleResponse);
}

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/v1/get_user`, requestOptions).then(handleResponse).then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('user', JSON.stringify(user));
        return user;
    });;
}




// {"id":702050802,
//  "user": {"dealers_name": "honday HB colony", "is_verified": false}
// }

function updateUserDetails(user_id, details) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({user: details})
    };

    return fetch(`${config.apiUrl}/api/v1/users/${user_id}/update_details`, requestOptions).then(handleResponse);;
}

// {"id":702050802,
//  "user": {"password": "password12345"}
// }

function updateUserPassword(user_id, password_details) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({user: password_details})
    };

    return fetch(`${config.apiUrl}/api/v1/users/${user_id}update_pwd`, requestOptions).then(handleResponse);;
}



// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/v1/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("http response response ======", data);
        if (!response.ok) {
            if (response.status === 401) {
                console.log("(response logout)========================== ", response, response.status );
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            } else if (response.status === 422) {
                console.log("data fields error");
                const error = (data && data.errors) || response.statusText;
                console.log("data fields error", data.errors);
                var errorMsg = Object.keys(data.errors)[0] + ' ' + data.errors[Object.keys(data.errors)[0]][0];
                return Promise.reject(errorMsg);

            }
        }
        return data;
    });
}