import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./Container/App"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import store from './Storage/Redux/store';
import { Provider } from 'react-redux';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <React.StrictMode>
      <App/>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
