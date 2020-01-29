import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { RouterGuard } from 'react-router-guard';
import config from './config';

const App = () => {
    return (
        <RouterGuard config={config} />
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
