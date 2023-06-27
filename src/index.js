import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { faTrash, faEdit, faPlus, faCirclePlus, faEye, faDownload } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(faTrash, faEdit, faCirclePlus, faEye, faDownload);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
