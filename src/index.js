import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme'; // Import your Material-UI theme configuration
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Route, Routes } from "react-router-dom";
import Diagnosis from "./pages/Diagnosis"; // Import the default export


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/Diagnosis" element={<Diagnosis />} />
          {/* Define more routes as needed */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
