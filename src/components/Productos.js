import React,{ Fragment,useEffect } from 'react';

// ! Redux
import { useSelector, useDispatch } from 'react-redux';

// ? ProductosActions.js
import {obtenerProductosActions} from '../actions/productoActions';


// ? Componente
import Producto from './Producto';

const Productos = () => {

    // * UTILIZAMOS useDispatch y te crea una función
     const dispatch = useDispatch();

     useEffect(() => {

         // ? CONSULTAR LA API
         // * MANDAR A LLAMAR EL ACTION DE PRODUCTOACTIONS.JS EN ESTE CASO SERIA LA DE CARGARPRODUCTOS
         const descargarProductos = () => dispatch( obtenerProductosActions());
         descargarProductos();

         //eslint-lint-disable-next-line
     },[])
     

    // * OBTENER LOS PRODUCTOS DEL STATE
    const productos = useSelector(state => state.productos.productos);

    const error = useSelector(state => state.productos.error);

    const cargando = useSelector(state => state.productos.loading);

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {error ?
                <p className=" font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> :null}

            {cargando ? <p className="text-center">Cargando Productos</p>:null}

            <table className="table table-striped">

                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                {productos.length === 0 ? 'No hay productos' : (
                    productos.map(producto => (
                        <Producto
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                )}
                </tbody>
            </table>

        </Fragment>
    );
}


export default Productos;
