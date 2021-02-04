import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTO,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINADOR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDITAR_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

// * IMPORTAMOS EL CLIENTE DE AXIOS
import clienteAxios from '../config/axios';

// sweetalert2 PARA ALERTAS
import Swal from 'sweetalert2';

// * FUNCIÓN QUE CREA UN NUEVO PRODUCTO
export function actionNuevoProducto(producto){
        //console.log(producto);
        return async (dispatch) => {
            dispatch( agregarProducto() );

            try {
                // INSERTAR EN LA API
                await clienteAxios.post('/productos',producto);
                // SI ESTA BIEN ACTUALIZAMOS EL STATE
                dispatch( agregarProductoExito( producto ) );
                //console.log('Exito')
                // ALERTA
                Swal.fire(
                    'Correcto',
                    'El producto se agregó correctamente',
                    'success'
                )
            } catch (error) {
                //console.log('Entre al error')
                // SI HAY UN ERROR CAMBIAMOS EL STATE
                dispatch( agregarProductosError(true));
                // ALERTA
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text:'Hubo un error, intente de nuevo'
                })
            }
        }
}

// ? FUNCIÓN QUE AGREGA NUEVOS PRODUCTOS
const agregarProducto = () => ({
   type: AGREGAR_PRODUCTO,
    payload:true
});

// ? Función SI EL PRODUCTO SE GUARDO EN LA BASE DE DATOS
const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// ? FUNCIÓN SI HUBO UN ERROR
const agregarProductosError = estado =>({
    type:AGREGAR_PRODUCTO_ERROR,
    payload: estado
});


// * FUNCIÓN QUE DESCARGAR LOS PRODUCTOS DE LA BASE DE DATOS
export function obtenerProductosActions(){
    return async (dispatch) => {
        dispatch( descargarProductos() );

        // ? CONSULTA A LA REAS API
        try {

                const respuestaAPI = await clienteAxios.get('/productos');
                //console.log(respuestaAPI.data);

                dispatch( DescargaProductosExito(respuestaAPI.data));

        } catch(error){
            console.log(error);
            dispatch( DescargaProductosError());

        }
    }
}

// ? FUNCIÓN QUE DESCARGAR LOS PRODUCTOS
const descargarProductos = () =>({
    type:COMENZAR_DESCARGA_PRODUCTO,
    payload:true
});


const DescargaProductosExito = respuestaAPI =>({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload:respuestaAPI
});

const DescargaProductosError = () => ({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload:true
});

// * fUNCIÓN QUE ELIMINA UN PRODUCTO

export function eliminaProductoAction(id){

    return async (dispatch) => {
            dispatch(eliminarProducto(id));
        try{


            // ? IR A LA API
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminProductoExito());

            // * MOSTRAR ALERTA
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente',
                'success'
            )

        } catch(Error){
            dispatch(eliminarProductoError());
        }
    }

}

const eliminarProducto = id =>({
    type:OBTENER_PRODUCTO_ELIMINADOR,
    payload:id
});

const eliminProductoExito = () =>({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () =>({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload:true
});

// * FUNCIÓN QUE OBTIENE UN PRODUCTO
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto(producto));

    }

}

const editarProducto = producto =>({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// * FUNCIÓN QUE EDITA UN PRODUCTO

export function editarProductoActions(producto){

    return async (dispatch)=>{
        dispatch( productoEditado() );

        try{
            await clienteAxios.put(`/productos/${producto.id}`, producto);

            dispatch(editarProductoExito(producto));
        }catch(error){
            dispatch(editarProductoError());
        }

    }
}

const productoEditado = () =>({
   type: COMENZAR_EDITAR_PRODUCTO
});

const editarProductoExito = producto =>({
    type:PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type:PRODUCTO_EDITADO_ERROR,
    payload:true
})