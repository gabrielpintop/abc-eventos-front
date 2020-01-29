import React, { useState } from 'react';
import { Link } from 'react-router-guard';
import authentication from '../../services/authentication.js';

const Register = props => {
  const [form, setValues] = useState({
    email: '',
    password: ''
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
    authentication
      .register(form)
      .then(data => {
        alert(data);
        props.history.push('/login');
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  return (
    <section className="authentication">
      <section className="authentication__container">
        <div>
          <h2>ABC eventos</h2>
          <h4 className="mb-0">Regístrate</h4>
        </div>
        <form className="authentication__container--form" onSubmit={handleSubmit}>
          <input
            name="email"
            className="authentication__container--form--input"
            type="email"
            placeholder="Correo"
            onChange={handleInput}
            disabled={loading}
            required
          />
          <input
            name="password"
            className="authentication__container--form--input"
            type="password"
            placeholder="Contraseña"
            onChange={handleInput}
            disabled={loading}
            required
          />
          {loading ? (
            <div className="text-center">
              <i className="fas fa-2x fa-spin fa-spinner"></i>
            </div>
          ) : (
              <button className="btn-authentication">Registrarme</button>
            )}
        </form>
        {!loading ? <p className="authentication__container--option">
          ¿Ya tienes una cuenta?&nbsp;&nbsp;<Link to="/logIn">Inicia sesión</Link>
        </p> : <div><br /></div>}
        <small>Desarollada por <a className="text-white" href="https://gabrielpinto.me" target="blank"><i>Gabriel Pinto</i></a></small>
      </section>
    </section>
  );
};

export default Register;
