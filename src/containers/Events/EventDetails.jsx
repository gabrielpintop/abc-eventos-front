import React from 'react';
import { Link } from 'react-router-guard';
import { logOut } from '../../services/authentication';
import { deleteEvent, getEventDetails } from '../../services/events';
import './EventCreate.css';
import EventEdit from './EventEdit';

export default class EventsCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,
            loading: true,
            loadingDelete: false,
            editEvent: false
        }
    }

    componentDidMount() {
        this.loadEvent();
    }

    handleLogOut = () => {
        logOut();
    };

    deleteEvent = (eventName, eventId) => {
        if (window.confirm(`¿Quieres eliminar el evento ${eventName}?`)) {
            this.setState({
                loadingDelete: true
            });
            deleteEvent(eventId).then(data => {
                window.alert('El evento ha sido eliminado');
                this.props.history.push('/events');
            }).catch(err => {
                this.setState({
                    loadingDelete: false
                });
                window.alert(err);
            });
        }
    }

    loadEvent() {
        getEventDetails(this.props.match.params.id).then(data => {
            this.setState({
                loading: false,
                event: data
            });
        }).catch(err => {
            alert(err);
            this.props.history.push('/events');
            this.setState({
                loading: false
            });
        });
    }

    dateToString(date) {
        const currentDate = new Date(date);
        return `${currentDate.toLocaleDateString()}`;
    }

    dateToTimeString(date) {
        const currentDate = new Date(date);
        return `${currentDate.toLocaleTimeString()}`;
    }

    enableEventEdit = (reload) => {
        if (reload) {
            this.setState({
                loading: true,
                editEvent: false,
                event: null
            }, () => {
                this.loadEvent();
            });
        } else {
            this.setState({
                editEvent: !this.state.editEvent
            });
        }
    }

    render() {
        const { loading, event, loadingDelete, editEvent } = this.state;
        return (
            <>
                <div className="row pt-5 d-flex align-items-center mb-5">
                    <div className="col-1 text-right"><Link to="/events"><i className="fas fa-home fa-lg text-white pointer"></i></Link></div>
                    <div className="col-10 text-white text-center">
                        {!loading && event ?
                            <h2 className="mb-3">{event.name}</h2>
                            :
                            <i className="fas fa-spin fa-spinner fa-2x"></i>
                        }
                    </div>
                    <div className="col-1">
                        <i className="fas fa-sign-out-alt fa-lg text-white pointer" onClick={() => this.handleLogOut()}></i>
                    </div>
                    {!loading && event &&
                        <div className="col-lg-6 col-md-8 mx-auto text-white shadow border border-white rounded mt-3">
                            {editEvent ?
                                <EventEdit event={event} toggleEdit={this.enableEventEdit} />
                                :
                                <div className="row pt-4 pb-4">
                                    <div className="col-md-6">
                                        <h5 className="mt-2"><b>Fecha de inicio:</b><br />{this.dateToString(event.start_date)}</h5>
                                        <h5 className="mt-2"><b>Hora de inicio:</b><br />{this.dateToTimeString(event.start_date)}</h5>
                                        {event.end_date &&
                                            <>
                                                <h5 className="mt-2"><b>Fecha fin:</b><br />{this.dateToString(event.end_date)}</h5>
                                                <h5 className="mt-2"><b>Hora fin:</b><br />{this.dateToTimeString(event.end_date)}</h5>
                                            </>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="mt-2"><b>Categoría:</b><br />{event.category}</h5>
                                        {!Boolean(event.online) &&
                                            <>
                                                <h5 className="mt-2"><b>Lugar:</b><br />{event.place}</h5>
                                                <h5 className="mt-2"><b>Dirección:</b><br />{event.address}</h5>
                                            </>
                                        }
                                        {Boolean(event.online) &&
                                            <>
                                                <h5 className="mb-0"><b>Enlace:</b><br /><a className="text-white" href={event.place} target="blank">{event.place}</a></h5>
                                            </>
                                        }
                                    </div>
                                    <div className="col-12 text-center mt-3">
                                        {loadingDelete ?
                                            <i className="fas fa-spin fa-spinner fa-2x"></i>
                                            :
                                            <>
                                                <button className="btn btn-info m-2 border-white" onClick={() => this.enableEventEdit()}><i className="fas fa-pen"></i>&nbsp;Editar</button>
                                                <button className="btn btn-danger m-2 border-white" onClick={() => this.deleteEvent(event.name, event.id)}><i className="fas fa-trash"></i>&nbsp;Eliminar</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </>
        );
    }
}