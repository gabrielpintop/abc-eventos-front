import React from 'react';
import { Link } from 'react-router-guard';
import './EventInfo.css';

const dateToString = (date) => {
    const currentDate = new Date(date);
    return `${currentDate.toLocaleDateString()}`;
};

const EventInfo = ({ event }) => (
    <div className="col-md-4 col-sm-6 bg-transparent border-white mb-4">
        <Link to={`/events/${event.id}`}>
            <div className="card bg-transparent shadow border-white p-0 w-75 mx-auto">
                <h5 className="mb-0 text-center bg-white p-2">{event.name}</h5>
                <div className="p-2 text-white">
                    <div className="row">
                        <div className="col-6">
                            <h6 className="mb-0">{event.category}</h6>
                        </div>
                        {Boolean(event.online) &&
                            <div className="col-6 text-right">
                                <span className="badge badge-pill badge-success">Online</span>
                            </div>
                        }
                    </div>
                    <p className="mb-0"><i
                        className="fas fa-calendar"></i>&nbsp;{dateToString(event.start_date)}</p>
                    <p className="mb-0"><i className="fas fa-map-marker"></i>&nbsp;{event.place}</p>
                </div>
            </div>
        </Link>
    </div>
);

export default EventInfo;