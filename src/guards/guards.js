const { isAuthenticated } = require('../services/authentication');

const auth = (props) => {
    return new Promise((resolve, reject) => {
        const authenticated = isAuthenticated();
        authenticated ? resolve(authenticated.payload) : reject(new Error('/login'));
    });
};

const noAuth = (props) => {
    return new Promise((resolve, reject) => {
        !isAuthenticated() ? resolve('') : reject(new Error('/'));
    });
};

module.exports = {
    auth,
    noAuth
}