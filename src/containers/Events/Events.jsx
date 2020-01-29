import React from 'react';
import { Link } from 'react-router-guard';
import { logOut } from '../../services/authentication';
import { getEvents } from '../../services/events';
import EventInfo from './EventInfo';
import './Events.css';

export default class Events extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true
    }
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents() {
    getEvents().then(data => {
      this.setState({
        loading: false,
        events: data
      });
    }).catch(err => {
      alert(err);
      this.setState({
        loading: false,
        events: []
      })
    });
  }

  handleLogOut = () => {
    logOut();
  };

  render() {
    const { loading } = this.state;
    const events = this.state.events.map(event =>
      <EventInfo event={event} key={event.id} />
    );
    return (
      <>
        <div id="eventsContainer" className="row pt-5 d-flex align-items-center mb-5">
          <div className="col-1"></div>
          <div className="col-10 text-center text-white">
            <div className="card bg-transparent shadow border-white d-inline-block pt-1 pb-1 pl-3 pr-3">
              <h2 className="mb-0">Mis eventos</h2>
            </div>
          </div>
          <div className="col-1">
            <i className="fas fa-sign-out-alt fa-lg text-white pointer" onClick={this.handleLogOut}></i>
          </div>
          <div className="col-12 mt-3 mb-3">
            <hr className="bg-white w-50 mx-auto" />
          </div>
          {loading &&
            <div className="col-12 text-center text-white">
              <i className="fas fa-spin fa-spinner fa-2x mt-5"></i>
            </div>
          }
          {!loading &&
            <div id="eventsList" className="col-12 row no-gutters">
              {events.length > 0 ?
                events
                :
                <div className="col-12 text-center">
                  <h4 className="mb-0 text-white">Empieza creando un evento</h4>
                </div>
              }
            </div>
          }
        </div>
        <div id="addEventButtonContainer" className="animated slideInUp">
          <Link to="/events/create">
            <span target="blank" id="addEventButton"
              className="btn shadow-lg cursor mb-3 border-white btn-pill"><i className="fas fa-plus"></i>&nbsp;Crear evento</span>
          </Link>
        </div>
      </>
    );
  }

}

