import {useDispatch, useSelector} from 'react-redux'

import {Link} from "react-router-dom";
import React from 'react'
import {unPokeDetalleAccion} from '../redux/pokeDucks'

const Detalle = (props) => {
    const dispatch = useDispatch()
    const baseURL = 'http://localhost:8080/api/pokemones/listar/'

    React.useEffect( () => {
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        const prodId = getParameterByName('id');
    

        dispatch(unPokeDetalleAccion(baseURL+ prodId))
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemon)
    
     
    return (
        <div className="card mt-3 text-center">
            <div className="card-body">
                {
                    console.log('ewewewewe', pokemon)
                }
            <div  className="embed-responsive embed-responsive-16by9">
                <img style={{'width': '300px'}} src={pokemon.foto} alt="" className="img-fluid" />
            </div>
                <div className="card-title text-uppercase mt-4 fs-3">{pokemon.nombre}</div>
                <p className="card-text">{pokemon.desc} </p>
            </div>
            <Link className="btn btn-dark col-md-2 m-2" to='/inicio'> Lista pokemones</Link>
        </div>

    )
}

export default Detalle
