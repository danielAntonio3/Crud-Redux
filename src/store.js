// SI USAS APPLYMIDDLEWARE PUEDES USAR THUNK
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


const store = createStore(
    reducer,
    compose( applyMiddleware(thunk),

        //PARA QUE FUNCIONE LA EXTENCION DE REDUX EN EL NAVEGADOR
        typeof window === 'object' &&
           typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
                  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
);

export default store;

