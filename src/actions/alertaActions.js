import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

// ! MUESTAR UNA ALERTA
export function mostrarAlerta(alerta){
    return (dispatch) => {
        dispatch( crearAlerta(alerta) );
    }

}

const crearAlerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});

// * OCULTAR ALERTA
export function ocultarAlertaActios(){

    return (dispatch) => {
        dispatch( ocultarAlerta() );
    }

}

const ocultarAlerta = () =>({
   type: OCULTAR_ALERTA
});