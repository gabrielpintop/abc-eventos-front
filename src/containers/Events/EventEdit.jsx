import React, { useState } from 'react';
import { updateEvent } from '../../services/events';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './EventCreate.css';
import es from 'date-fns/locale/es';
registerLocale('es', es);

const EventEdit = (props) => {

    const [startDate, setStartDate] = useState(new Date(props.event.start_date));

    const [endDate, setEndDate] = useState(new Date(props.event.end_date));

    const [form, setValues] = useState({
        name: props.event.name,
        category: props.event.category,
        online: String(props.event.online),
        place: props.event.place,
        address: props.event.address || ''
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

        updateEvent({ id: props.event.id, name, category, startDate: startDate.getTime(), endDate: endDate.getTime(), online: Number(online), place, address: Number(online) === 1 ? null : address }).then(data => {
            window.alert(data);
            props.toggleEdit(true);
        }).catch(err => {
            setLoading(false);
            window.alert(err);
        });

    };

    return (

        <form className="events-manage__container--form" onSubmit={handleSubmit}>
            <div className="row pt-4 pb-4">

                <div className="col-md-6 mb-3">
                    <label>Nombre</label>
                    <input
                        name="name"
                        className="form-control bg-transparent text-white"
                        type="text"
                        disabled={loading}
                        value={form.name}
                        onChange={handleInput}
                        minLength="2"
                        maxLength="200"
                        required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Categoría</label>
                    <select name="category" className="form-control bg-transparent text-white pointer" onChange={handleInput}
                        disabled={loading} value={form.category} required>
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
                        disabled={loading} value={form.online} required>
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
                        value={form.place}
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
                            value={form.address}
                            maxLength="250"
                            required
                        />
                    </div>}
            </div>
            <div className="text-center mb-3">
                {loading ? (
                    <i className="fas fa-2x fa-spin fa-spinner"></i>

                ) : (
                        <>
                            <button className="btn btn-info border-white m-2"><i className="fas fa-save"></i>&nbsp;Guardar cambios&nbsp;</button>
                            <button className="btn btn-danger border-white m-2" type="button" onClick={() => props.toggleEdit()}><i className="fas fa-times"></i>&nbsp;Cancelar&nbsp;</button>
                        </>
                    )}
            </div>
        </form>
    );
};

export default EventEdit;
