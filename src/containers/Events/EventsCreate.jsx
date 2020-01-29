import React, { useState } from 'react';
import { Link } from 'react-router-guard';
import { logOut } from '../../services/authentication';
import { createEvent } from '../../services/events';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './EventsCreate.css';
import es from 'date-fns/locale/es';
registerLocale('es', es);

const EventsCreate = props => {

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState();

    const [form, setValues] = useState({
        startDate: new Date(),
        name: '',
        category: 'Conferencia',
        online: '0',
        place: '',
        address: ''
    });

    const [loading, setLoading] = useState(false);

    const handleInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        const { name, category, online, address, place } = form;

        createEvent({ name, category, startDate: startDate.getTime(), endDate: endDate.getTime(), online: Number(online), place, address }).then(data => {
            alert('Evento creado con id ' + data);
            props.history.push('/event');
        }).catch(err => {
            setLoading(false);
            alert(err);
        });

    };

    const handleLogOut = () => {
        logOut();
    };

    return (
        <div id="eventsContainer" className="row pt-5 d-flex align-items-center mb-5">
            <div className="col-1 text-right"><Link to="/events"><i className="fas fa-arrow-left fa-lg text-white pointer"></i></Link></div>
            <div className="col-10 text-white">
                <div className="col-12 text-center">
                    <h2 className="mb-3">Crear evento</h2>
                </div>
            </div>
            <div className="col-1">
                <i className="fas fa-sign-out-alt fa-lg text-white pointer" onClick={handleLogOut}></i>
            </div>
            <div className="col-10 mx-auto text-white shadow border border-white rounded mt-3">
                <form className="events-manage__container--form" onSubmit={handleSubmit}>
                    <div className="row pt-4 pb-4">

                        <div className="col-md-6 mb-3">
                            <label>Nombre</label>
                            <input
                                name="name"
                                className="form-control bg-transparent text-white"
                                type="text"
                                onChange={handleInput}
                                disabled={loading}
                                minLength="2"
                                maxLength="200"
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Categoría</label>
                            <select name="category" className="form-control bg-transparent text-white pointer" onChange={handleInput}
                                disabled={loading} required>
                                <option className="text-dark">Conferencia</option>
                                <option className="text-dark">Congreso</option>
                                <option className="text-dark">Curso</option>
                                <option className="text-dark">Seminario</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Fecha inicio</label>
                            <br />
                            <DatePicker
                                locale="es"
                                minDate={new Date()}
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                showTimeSelect
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="dd/MM/yyyy HH:mm"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Fecha fin</label>
                            <br />
                            <DatePicker
                                locale="es"
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                showTimeSelect
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="dd/MM/yyyy HH:mm"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Tipo</label>
                            <select name="online" className="form-control bg-transparent text-white pointer" onChange={handleInput}
                                disabled={loading} required>
                                <option className="text-dark" value={0}>Presencial</option>
                                <option className="text-dark" value={1}>Online</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>{form.online === '1' ? 'Enlace' : 'Lugar'}</label>
                            <input
                                name="place"
                                className="form-control bg-transparent text-white"
                                type="text"
                                onChange={handleInput}
                                disabled={loading}
                                maxLength="250"
                                required
                            />
                        </div>
                        {form.online === '0' &&
                            <div className="col-md-6 mb-3">
                                <label>Dirección</label>
                                <input
                                    name="address"
                                    className="form-control bg-transparent text-white"
                                    type="text"
                                    onChange={handleInput}
                                    disabled={loading}
                                    maxLength="250"
                                    required
                                />
                            </div>}
                    </div>
                    <div className="text-center mb-3">
                        {loading ? (
                            <i className="fas fa-2x fa-spin fa-spinner"></i>

                        ) : (
                                <button className="btn-events-manage">&nbsp;Crear evento&nbsp;</button>
                            )}
                    </div>
                </form>

            </div>
        </div>

        // <section className="authentication">
        //     <section className="authentication__container">
        //         <div>
        //             <h2>ABC eventos</h2>
        //             <h4 className="mb-0">Inicia sesión</h4>
        //         </div>
        //         <form className="authentication__container--form" onSubmit={handleSubmit}>
        //             <input
        //                 name="email"
        //                 className="authentication__container--form--input"
        //                 type="email"
        //                 placeholder="Correo"
        //                 onChange={handleInput}
        //                 disabled={loading}
        //                 required
        //             />
        //             <input
        //                 name="password"
        //                 className="authentication__container--form--input"
        //                 type="password"
        //                 placeholder="Contraseña"
        //                 onChange={handleInput}
        //                 disabled={loading}
        //                 required
        //             />
        //             {loading ? (
        //                 <div className="text-center">
        //                     <i className="fas fa-2x fa-spin fa-spinner"></i>
        //                 </div>
        //             ) : (
        //                     <button className="btn-authentication">Iniciar sesión</button>
        //                 )}
        //         </form>
        //         {!loading ? <p className="authentication__container--option">
        //             ¿No tienes una cuenta?&nbsp;&nbsp;<Link to="/register">Regístrate</Link>
        //         </p> : <div><br /></div>}
        //     </section>
        // </section>
    );
};

export default EventsCreate;
