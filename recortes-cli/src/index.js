
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import App from './App';
import { mensagemReducer, exibicaoMensagemReducer } from './reducers';


const recorteStore = createStore(combineReducers({
    mensagem: mensagemReducer,
    exibicao: exibicaoMensagemReducer
}))

ReactDOM.render(
    <Provider store={recorteStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
