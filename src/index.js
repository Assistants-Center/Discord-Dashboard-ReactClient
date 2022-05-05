import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {StyleReset, ThemeProvider} from 'atomize';

import {Provider as StyletronProvider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic";

const engine = new Styletron();

const theme = {
    colors: {
        primary: 'white',
        accent: 'white',
        black: 'white',
        dark: 'white',
    },
    fontFamily: {
        primary: 'Public Sans, sans-serif',
    },
    grid: {
        gutterWidth: 0
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <StyletronProvider value={engine} debug={void (0)} debugAfterHydration>
            <ThemeProvider theme={theme}>
                <StyleReset/>
                <App/>
            </ThemeProvider>
        </StyletronProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
