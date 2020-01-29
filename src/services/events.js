const { getRequest, postRequest, putRequest, deleteRequest } = require('./http-helper');
const api = 'events';

const getEvents = () => {
    return new Promise((resolve, reject) => {
        getRequest(api, resolve, reject, true);
    });
};

const getEventDetails = (id) => {
    return new Promise((resolve, reject) => {
        getRequest(`${api}/${id}`, resolve, reject, true);
    });
};

const deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        deleteRequest(`${api}/${id}`, resolve, reject, true);
    });
};

const createEvent = ({ name, category, startDate, endDate, online, place, address }) => {
    return new Promise((resolve, reject) => {
        postRequest(api, { name, category, startDate, endDate, online, place, address }, resolve, reject, true);
    });
};

const updateEvent = ({ id, name, category, startDate, endDate, online, place, address }) => {
    return new Promise((resolve, reject) => {
        putRequest(`${api}/${id}`, { name, category, startDate, endDate, online, place, address }, resolve, reject, true);
    });
};


module.exports = {
    getEvents,
    getEventDetails,
    createEvent,
    updateEvent,
    deleteEvent
}