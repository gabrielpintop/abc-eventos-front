const axios = require('axios').default;
const api = 'http://localhost:3001/api/';

const getRequest = (endpoint, resolve, reject, token, callback) => {
    handleRequestResponse(axios.get(api + endpoint, getHeaders(token)), resolve, reject, callback);
};

const postRequest = (endpoint, body, resolve, reject, token, callback) => {
    handleRequestResponse(axios.post(api + endpoint, body, getHeaders(token)), resolve, reject, callback);
};

const handleRequestResponse = (request, resolve, reject, callback) => {
    request.then(res => {
        if (callback) {
            callback(res.data.data, resolve);
        } else {
            resolve(res.data.data);
        }
    }).catch(err => {
        handleError(err, reject);
    });
}

const handleError = (err, reject) => {
    console.log(err);
    if (!err.response) {
        return reject('Se presentó un error realizando la petición');
    }
    console.log(err.response);

    const { status, data: { errors } } = err.response;
    if (status === 400 || status === 404 || status === 401) {
        if (status === 401) {
            localStorage.clear();
            alert(errors[0]);
            // window.location.reload();
        }

        if (errors) {
            return reject(errors[0]);
        }
    }
    return reject('Se presentó un error realizando la petición');
};

const getHeaders = (token) => {
    if (!token) {
        return {};
    }
    return {
        headers: {
            Authorization: localStorage.getItem('ABC_EVENTOS_STUFF')
        }
    }
};

module.exports = {
    getRequest,
    postRequest
}