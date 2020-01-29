const { postRequest } = require('./http-helper');
const jwt = require('jsonwebtoken');
const api = 'auth';

const logIn = ({
    email,
    password
}) => {
    return new Promise((resolve, reject) => {
        email = email.toLowerCase();
        postRequest(api + '/signIn', { email, password }, resolve, reject, null, saveToken);
    });
};

const register = ({
    email,
    password
}) => {
    return new Promise((resolve, reject) => {
        email = email.toLowerCase();
        postRequest(api + '/signUp', { email, password }, resolve, reject);
    });
};

const logOut = () => {
    localStorage.clear();
    window.location.reload();
}

const isAuthenticated = () => {
    try {
        const token = localStorage.getItem('ABC_EVENTOS_STUFF');
        if (!token) {
            return false;
        }
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
            localStorage.clear();
            return false;
        }
        return decodedToken;
    } catch (error) {
        console.log(error);
        localStorage.clear();
        return false;
    }
}

const saveToken = (token, resolve) => {
    localStorage.clear();
    localStorage.setItem('ABC_EVENTOS_STUFF', token);
    resolve('');
};

module.exports = {
    register,
    logIn,
    logOut,
    isAuthenticated
}