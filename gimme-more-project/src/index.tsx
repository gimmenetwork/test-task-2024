import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LibraryProvider } from './context-api/BaseContextApi';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <LibraryProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </LibraryProvider>

);

reportWebVitals();
