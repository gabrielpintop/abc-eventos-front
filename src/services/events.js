const { getRequest, postRequest } = require('./http-helper');
const api = 'events';

const getEvents = () => {
    return new Promise((resolve, reject) => {
        getRequest(api, resolve, reject, true);
    });
};

const createEvent = ({ name, category, startDate, endDate, online, place, address }) => {
    return new Promise((resolve, reject) => {
        postRequest(api, { name, category, startDate, endDate, online, place, address }, resolve, reject, true);
    });
};

module.exports = {
    getEvents,
    createEvent
}