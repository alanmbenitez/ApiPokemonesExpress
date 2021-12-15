/* import {auth, db} from '../firebase' */

import { useDispatch, useSelector } from 'react-redux';

import React from 'react'
import { accederAccion } from '../redux/usuarioDucks';
import { withRouter } from "react-router-dom";

const Login = (props) => {
    const dispatch = useDispatch()
   

    const loading = useSelector(store=> store.usuario.loading)
    const activo = useSelector(store=> store.usuario.activo)

     


 

        React.useEffect(()=>{
            console.log(activo);
            if (activo) {
                props.history.push('/')
            }
        },[activo, props.history] )
    return (
        <div className="mt-5">
      
            <h3 className="text-center" > Acceso con Google</h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                   
                     <div className="d-grid gap-2 col-12 mx-auto">
                        <button 
                        type="submit" 
                        onClick={() => dispatch(accederAccion())} 
                        className="btn btn-dark btn-lg  btn-block"
                        disabled={loading}
                        >Acceder</button>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default  withRouter(Login)
