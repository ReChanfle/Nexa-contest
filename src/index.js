import React from 'react';
import ReactDOM from 'react-dom/client';
import { store,persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element '#root' not found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>,
    </React.StrictMode>
);