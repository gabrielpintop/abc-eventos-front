import React from 'react';

const dateToString = (date) => {
    const currentDate = new Date(date);
    return `${currentDate.toLocaleDateString()} - ${currentDate.toLocaleTimeString()}`;
};

const EventInfo = ({ event }) => (
    <div className="col-md-4 col-sm-6 bg-transparent border-white mb-4">
        <div className="card bg-transparent shadow border-white p-0 w-75 mx-auto">
            <h5 className="mb-0 text-center bg-white p-2">{event.name}</h5>
            <div className="p-2 text-white">
                <div className="row">
                    <div className="col-6">
                        <h6 className="mb-0">{event.category}</h6>
                    </div>
                    {Boolean(event.online) &&
                        <div className="col-6 text-right">
                            <span class="badge badge-pill badge-success">Online</span>
                        </div>
                    }
                </div>
                <p className="mb-0"><i
                    className="fas fa-calendar-check"></i>&nbsp;<b>Inicio:</b>&nbsp;{dateToString(event.start_date)}</p>
                <p className="mb-0"><i className="fas fa-calendar-times"></i>&nbsp;<b>Fin:</b>&nbsp;{dateToString(event.end_date)}</p>
            </div>
        </div>
    </div>
);

export default EventInfo;