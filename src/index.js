import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "C:/Capstone/picnic-front/node_modules/react-image-gallery/styles/css/image-gallery.css";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter>
  <App/>
</BrowserRouter>);
reportWebVitals();

// ReactDOM.render(
//   <BrowserRouter>
//     <App/>
//   </BrowserRouter>,
//   document.getElementById('root')
// );


reportWebVitals();
