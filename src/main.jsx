import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <DataProvider>
            <App />
        </DataProvider>
    </Router>
);
