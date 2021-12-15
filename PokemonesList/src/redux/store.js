import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import  pokeReducer , {unpokeReducer}  from './pokeDucks'
import usuarioReducer,{ leerUsuarioActivoAccion } from './usuarioDucks'

import thunk from 'redux-thunk'

// siempre se llama al reducer
/* 
import {composeWithDevTools} from 'redux-devtools-extension' */


const rootReducer = combineReducers({
    pokemones: pokeReducer,
    pokemon: unpokeReducer,
    usuario: usuarioReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)))
    leerUsuarioActivoAccion()(store.dispatch)
    return store; 
}