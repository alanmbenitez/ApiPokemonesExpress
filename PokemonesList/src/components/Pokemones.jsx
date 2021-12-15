import {obtenerPokemonesAccion, previoPokemonAction, siguientePokemonAction, unPokeDetalleAccion} from '../redux/pokeDucks'
import {useDispatch, useSelector} from 'react-redux'

import Detalle from './Detalle'
import {Link} from "react-router-dom";
import React from 'react'

const Pokemones = () => {
    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones) 
    


   React.useEffect( () => {
        
        dispatch(obtenerPokemonesAccion())
    }, [dispatch])
    
    const baseURL = 'http://localhost:8080/api/pokemones/listar/'
    const styleTitle= {
    fontFamily: 'Bangers', 
    fontStyle: 'cursive',
    fontWeight: 'bold',
    fontSize: '95px',
    webkitTextFillColor: '#fdd100',
    webkitTextStroke: '3px #1e69b7',
    }
    
  
    return (
        <div className="row col-md-12">
            <h1 style={styleTitle} className="text-center">POKEMONES</h1>
            <div className="justify-items-center">

              <h2 className="text-center">Lista de Pokemones</h2>
            <br/>
            
            


            <ul className="list-group mt-3 col-md-6 mx-auto">
            {Object.keys(pokemones).length !== 0 &&  
             Object.keys(pokemones).map(item => (
                

                <li key={pokemones[item].id} className="list-group-item text-uppercase d-flex justify-content-between ">
                    <p> {pokemones[item].title} </p>
                    <Link className="btn btn-light btn-sm float-right"  to={`/pokemon?id=${pokemones[item].id}`}  
                    onClick={() => dispatch(unPokeDetalleAccion(baseURL+ pokemones[item].id))}
                    > + Info</Link>
                </li>
             ))
                    /* pokemones.map(item => (
                        <li key={item.title} className="list-group-item text-uppercase d-flex justify-content-between ">
                            <p> {item.title} </p>
                            <Link className="btn btn-light btn-sm float-right"  to={`/pokemon/${item.title}`}  onClick={() => dispatch(unPokeDetalleAccion(item.title))}> + Info</Link>
                        </li>
                    )) */
                }
            </ul>
            <div className="d-flex justify-content-between mt-4 mb-4">
                {
                    pokemones.length === 0 && <button className="btn btn-dark" onClick={() => dispatch(obtenerPokemonesAccion())}> Obtener pokemones</button>
                }
                <button className="btn btn-dark" onClick={() => dispatch(obtenerPokemonesAccion())}> Obtener pokemones</button>
                {/* {
                    next &&  <button className="btn btn-dark" onClick={() => dispatch(siguientePokemonAction())}> Siguientes pokemones</button>

                }
                {
                    previous && <button className="btn btn-dark" onClick={() => dispatch(previoPokemonAction())}> Anterior pokemones</button>
                } */}
            </div>
            </div>
            
        </div>
    )
}


export default Pokemones
