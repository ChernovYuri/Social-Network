import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {HashRouter} from "react-router-dom";
import {App} from "App";
import {store} from "redux/store";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    // <React.StrictMode>
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
    // </React.StrictMode>
)