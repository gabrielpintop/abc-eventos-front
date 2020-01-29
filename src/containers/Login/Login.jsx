import React, { useState } from 'react';
import { Link } from 'react-router-guard';
import authentication from '../../services/authentication.js';

const Login = props => {
  const [form, setValues] = useState({
    email: ''
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
      .logIn(form)
      .then(data => {
        props.history.push('/');
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
          <h4 className="mb-0">Inicia sesión</h4>
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
              <button className="btn-authentication">Iniciar sesión</button>
            )}
        </form>
        {!loading ? <p className="authentication__container--option">
          ¿No tienes una cuenta?&nbsp;&nbsp;<Link to="/register">Regístrate</Link>
        </p> : <div><br /></div>}
        <small>Desarollada por <a className="text-white" href="https://gabrielpinto.me" target="blank"><i>Gabriel Pinto</i></a></small>
      </section>
    </section>
  );
};

export default Login;
