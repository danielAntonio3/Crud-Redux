import React,{useState} from 'react';
import { v4 as uuidv4 } from 'uuid';


// USEDISPATCH ES PARA EJECUTAR LAS ACCIONES QUE TENEMOS
// useSelector FORMA DE ACCEDER AL COMPONENTE
import {useDispatch, useSelector} from "react-redux";

//ACTION DE REDUX
import { actionNuevoProducto }  from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaActios } from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    // * STATE DEL COMPONENTE
    const [nombre,setNombre] =useState('');
    const [precio,setPrecio] = useState(0);

    // * UTILIZAMOS useDispatch y te crea una función
    const dispatch = useDispatch();

    // * MANDAR A LLAMAR EL ACTION DE PRODUCTOACTIONS.JS
    const agregarProducto = producto => dispatch( actionNuevoProducto(producto));



    // * ACCEDER AL STATE DEL STORE
    const cargando = useSelector(state => state.productos.loading);
    //const error = useSelector(state => state.productos.error)
    //{error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}

    const alerta = useSelector(state => state.alerta.alerta);


    // * FUNCIÓN QUE SE EJECUTA AL DAR CLICK EN AGREGAR
    const submitNuevoProducto = e => {
        e.preventDefault();

        //VALIDAD FORMULARIO
        if(nombre.trim() === '' || precio <= 0){

            const respuesta = {
                msg: 'Ambos campos son obligatorios',
                clases: ' alert alert-danger text-center text-uppercase p3'
            }

            dispatch( mostrarAlerta( respuesta ) );

            return;
        }

        // SI NO HAY ERRORES
        dispatch( ocultarAlertaActios() );

        //* AGREGAR UN IDE ES NECESARIO
         let id=uuidv4();

        // CREAR NUEVO PRODUCTO
        agregarProducto({
            nombre,
            precio,
            id
        })
        // REDIRECCIONAR A LA PAGINA PRINCIPAL
        history.push('/');
    }


    return (
        <div className=" row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        { alerta ?<p className={alerta.clases}>{alerta.msg}</p> :null }

                        <form
                            onSubmit={ submitNuevoProducto }
                        >

                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Nombre Producto"
                                       name="nombre"
                                       value={nombre}
                                       onChange={e => setNombre(e.target.value)}
                                />
                            </div>


                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input type="number"
                                       className="form-control"
                                       placeholder="Precio Producto"
                                       name="precio"
                                       value={precio}
                                       onChange={e => setPrecio( Number(e.target.value) )}
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        {cargando ? <p>Cargando</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default NuevoProducto;