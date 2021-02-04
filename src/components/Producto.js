import React from 'react';

import {useHistory} from 'react-router-dom';
import {eliminaProductoAction,editarProductoAction} from '../actions/productoActions';

// !REDUX
import { useDispatch} from 'react-redux';

// ? ALERTAS
import Swal from 'sweetalert2';

const  Producto = ({producto}) => {

    const dispatch = useDispatch();

    // ! EXTRAEMOS EL USEHISTORY
    const history = useHistory();

    // CONFIRMAR SI DESEA ELIMINAR
    const confirmarEliminarProducto = id =>{

        // ?PREGUNTAR AL USUARIO SI DESEA ELIMINAR EL PRODUCTO
        Swal.fire({
            title: '¿Estas seguro de eliminar el producto?',
            text: '¡No podrás revertir esto! Si, Eliminar!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText:'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // ! PASARLO AL ACTION
                dispatch( eliminaProductoAction(id));
            }
        });

    }

    // * FUNCIÓN QUE REDIRIGE A LA EDICIÓN DE FORMA PROGRAMADA
    const redirecciona = producto =>{
        dispatch(editarProductoAction(producto) );
        history.push(`/productos/editar/${producto.id}`);

    }

    //EXTRAER COMPONENTES
    const { nombre , precio, id} = producto;

    return(
      <tr>
          <td>{nombre}</td>
          <td><span className="font-weight-bold">${precio}</span></td>
          <td className="acciones">
              <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={ () => redirecciona(producto)}
              >
                  Editar
              </button>
              <button
                  type="button"
                  className="btn btn-danger"
                  onClick={ () => confirmarEliminarProducto(id)}
              >
                    Eliminar
              </button>
          </td>
      </tr>
    );
}

export default Producto;