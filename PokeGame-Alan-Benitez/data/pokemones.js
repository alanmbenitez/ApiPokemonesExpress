import React, { useEffect, useState } from 'react';

import axios from "axios"

/* const callPoke = async ()=> {
const response = await  axios.get('http://localhost:8080/api/pokemones/listar').then(
    res => {
        return res
    }
)

}
console.log(callPoke()); */
/* const [results, setResults] = useState([])
useEffect(()=>{
    

   const interval = setInterval(() => {

   axios.get('http://localhost:8080/api/pokemones/listar')
       .then(res => {
         setResults(res.data.result)
       });

   console.log('Every 5 seconds');
   }, 5000);

  return () => clearInterval(interval);

 },[]);

console.log(results); */

export const   POKEMONES = [
    "pickachu",
    "Bulbasaur", 
    "Charizardaaaaa", 
    "Psyduck", 
    "Eevee", 
    "Persian", 
    "Rattata", 
    "idgeotto"
] 