import axios from "axios"

//constantes

const dataInicial = {}

//types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTES_POKEMONES_EXITO = 'SIGUIENTES_POKEMONES_EXITO'
const PREVIO_POKEMONES_EXITO = 'PREVIO_POKEMONES_EXITO'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'
const POKEMON_MULTIPLE_SUCCESS = 'POKEMON_MULTIPLE_SUCCESS'






// reducer

export default function pokeReducer(state = dataInicial , action){
    
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {
              ...state, 
              ...action.payload}
                ;
        default:
            return state
    }
}

export  function unpokeReducer(state = dataInicial , action){
 
  switch(action.type){
     
      case POKE_INFO_EXITO:
              return {...action.payload};
      default:
          return state
  }
}



export const unPokeDetalleAccion = (url) => async (dispatch) =>{


    if(localStorage.getItem(url)){
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        console.log('localstorage');
        return
    }
    try {
       
        const res =await axios.get(url)
        dispatch({
            type: POKE_INFO_EXITO,
            payload:{
                nombre: res.data.title,
                desc: res.data.desc,   
                foto: res.data.thumbnail
            }
        })
        localStorage.setItem(url, JSON.stringify({
          nombre: res.data.title,
          desc: res.data.desc,   
          foto: res.data.thumbnail
        }))
      
    } catch (error) {
        console.log(error);
    }
}


export const obtenerPokemonesAccion =  () => async (dispatch) => {


   

    if (localStorage.getItem('offset=0')){
        console.log('datos guardados');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload : JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }
     
    try {
        console.log('llamado a la api');
        const res = await axios.get(`http://localhost:8080/api/pokemones/listar`)

        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload : res.data
        })
        console.log('====================================');
        console.log(Object.keys(res.data).length);
        console.log(res.data.length);

        console.log('====================================');
        if (Object.keys(res.data).length !== 0 ) {
         localStorage.setItem('offset=0', JSON.stringify(res.data) )
        }
    } catch (error) {
        console.log(error);
    }
}



