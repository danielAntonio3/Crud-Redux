import React,{ useState,useEffect } from 'react';

// ! REDUX
import {useSelector, useDispatch} from 'react-redux';

import { editarProductoActions } from '../actions/productoActions';

import {useHistory} from 'react-router-dom';

const EditarProductos = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ producto,guardarProducto] = useState({
        nombre: '',
        precio: '',
    });


    const productoEditar = useSelector( state => state.productos.productoeditar);

    useEffect(() => {
        guardarProducto(productoEditar);
    }, [productoEditar]);


    // * LEER LOS DATOS DEL FORMULARIO
    const onchangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    }

    const { nombre,precio} = producto;


    const submitEditarProducto = e =>{
        e.preventDefault();

        dispatch( editarProductoActions(producto) );
        history.push('/');

    }

    return (
        <div className=" row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >

                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={ nombre }
                                    onChange={onchangeFormulario}
                                />
                            </div>


                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={ precio }
                                    onChange={onchangeFormulario}
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default EditarProductos;