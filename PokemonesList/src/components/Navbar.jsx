import {Link, NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import React from 'react'
import { cerrarSesionAccion } from '../redux/usuarioDucks';
import { withRouter } from "react-router-dom";

/* import {auth} from '../firebase' */


const Navbar = (props) => {

    const dispatch = useDispatch()
    const activo = useSelector(store=> store.usuario.activo)


    const cerrarSesion = () => {
       dispatch(cerrarSesionAccion())
       props.history.push('/login')
    }


    return (
        <div className="navbar navbar-dark bg-dark p-3">
            <Link to="/inicio" className="navbar-brand">Inicio</Link>
            <div>
                <div className="d-flex">
                   {
                       activo ? (
                        <>
                            <NavLink className="btn btn-dark mr-2" to="/inicio" exact>
                                Inicio
                            </NavLink>
                            <NavLink className="btn btn-dark mr-2" to="/perfil" exact>
                                Perfil
                            </NavLink>
                            <button className="btn btn-dark" onClick={() => cerrarSesion()}> 
                                Cerrar Sesion
                            </button>
                        </>
                       ) : (
                        <NavLink className="btn btn-dark mr-2" to="/login">
                            Login
                        </NavLink>
                       )
                   } 
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
