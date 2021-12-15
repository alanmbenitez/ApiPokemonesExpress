import axios from "axios"

const initialState = {
    /* pokemones: POKEMONES, */
}


const POKE_INFO_EXITO = 'POKE_INFO_EXITO'



export default  function PokemonesReducer  (state = initialState , action)  {
    switch(action.type){
        case POKE_INFO_EXITO:
            return {
              ...state, 
              ...action.payload}
                ;
        default:
            return state
    }
}

export const obtenerPokemonesAccion =  () => async (dispatch) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/pokemones/listar`)
        let dtas = []
        res.data.forEach( function(valor) {
            dtas.push(valor.title
                );
        });
        
        function mixCards(array) {
            let currentIndex = array.length,  randomIndex;
            while (currentIndex != 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            return array;
          }
          
         
          var arr = dtas
          let num = arr.length - 8
          mixCards(arr);
          let final = arr.slice(num)
          console.log('finalyty',final);
        dispatch({
            type: POKE_INFO_EXITO,
            payload : final
        })
       
       
    } catch (error) {
        console.log(error);
    }
}

