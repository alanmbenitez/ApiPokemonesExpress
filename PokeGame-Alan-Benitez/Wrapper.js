import { Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import axios from "axios"
import { deviceWidth } from './app/common/dimensions';
import {obtenerPokemonesAccion} from './store/reducers/poke.reducer'

const INIT_ARRAY = Array(16).fill(null)
const INIT_ATTEMPTS = 0
const INIT_MATCHES = 0

export default function Wrapper(props) {

  const [locations, setLocations] = useState(INIT_ARRAY)
  
  const [first, setFirst] = useState(null)
  const [second, setSecond] = useState(null)

  const [attempts, setAttempts] = useState(INIT_ATTEMPTS)
  const [matches, setMatches] = useState(INIT_MATCHES)

  const [indexMatch, setMatchIndex] = useState([])

  const [GameWon, setGameWon] = useState(false)
 
  const dispatch = useDispatch()
  
   

  useEffect(()=>{
      dispatch(obtenerPokemonesAccion())
    
  },[dispatch])

  const pokes = useSelector(store => store.pokemones)

  const obtenerPokemones =  () => async (dispatch) => {

     
    try {
        const res = await axios.get(`http://localhost:8080/api/pokemones/listar`)
        let dtas = []

        res.data.forEach( function(valor) {
            dtas.push(valor.thumbnail
                );
        });
        
    
        function mixCards(array) {
            let actualIndex = array.length,  randomIndex;
            while (actualIndex != 0) {
              randomIndex = Math.floor(Math.random() * actualIndex);
              actualIndex--;
              [array[actualIndex], array[randomIndex]] = [
                array[randomIndex], array[actualIndex]];
            }
            return array;
          }
         
          var arr = dtas
          let num = arr.length - 8
          mixCards(arr);
          let final = arr.slice(num)
       return final
       
    } catch (error) {
        console.log(error);
    }
}

  
  const initializeGame = async (arr = INIT_ARRAY) => {

  
    let insertedIndices = [] 
    /* let letters = ["pickachu", "Bulbasaur", "Charizard", "Psyduck", "Eevee", "Persian", "Rattata", "idgeotto"] */
    let letters;
    //HAY QUE CAMBIAR ESTO!!!
    await dispatch(obtenerPokemones()).then((result) => {
        console.log(result);
        letters =  result;
    }).catch((error) => {
        console.log(error);
    });
    
    console.log('sasasasasas',letters);

    const getRandomIndex = () => (Math.floor(Math.random() * arr.length))
   

  

    console.log('====================================');
    console.log('asasas', letters);
    console.log('====================================');
    letters.forEach(letter => {
      for (let j = 0; j < 2; j++) {
        let randomIndex = getRandomIndex()
        while (insertedIndices.includes(randomIndex)) {
          randomIndex = getRandomIndex()
        }
        insertedIndices.push(randomIndex)
        arr[randomIndex] = letter
      }
    })


    setLocations(arr) 
    clearOption() 
    setAttempts(INIT_ATTEMPTS)
    setMatches(INIT_MATCHES) 
    setMatchIndex([])
    setGameWon(false) 
  }

  const clearOption = () => {
    setFirst(null)
    setSecond(null)
  }


  useEffect(() => {
    initializeGame()
  }, [])


  useEffect(() => {
    if (indexMatch.length && (indexMatch.length === locations.length)) setGameWon(true)
  }, [indexMatch])


 
  useEffect(() => {
    if (second) {
      const doesMatch = (first.value === second.value)
      if (doesMatch) setMatches(mat => ++mat)
      setAttempts(att => ++att)

      setTimeout(() => {
        if (doesMatch) {
          let _matchedIdx = indexMatch.slice()
          _matchedIdx.push(first.index, second.index)
          setMatchIndex(_matchedIdx)
        }
        clearOption()
      }, 500);
    }
  }, [second])


 
  const showCardFn = (index) => {
    let _selectionObj = {
      index,
      value: locations[index]
    }
    if (!first) setFirst(_selectionObj)
    else if (first.index === index) return;
    else setSecond(_selectionObj)
  }
  const image = { uri: "https://i.imgur.com/Z2Czytv.png" };
  const WON = { uri: "https://i.imgur.com/Barhck0.png" };
  const play = { uri: "https://i.imgur.com/J2Nxzfy.png" };
  const title = { uri: "https://i.imgur.com/81VIJur.png" };




  if (GameWon) return <ImageBackground source={image} resizeMode="cover" style={styles.image}> <SafeAreaView style={styles.container}><Image
  style={styles.wonLogo}
  source={WON}
/>
    <Pressable onPress={() => initializeGame()}><Image
    style={styles.playLogo}
    source={play}
  /></Pressable>
  </SafeAreaView></ImageBackground>


  return (
  
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <SafeAreaView style={styles.container}>
    <Image
    style={styles.titleLogo}
    source={title}/>

{
     console.log(pokes)
}
      

      <View style={styles.gridOutline}>
        <CardsContainer
          openIndices={[first?.index, second?.index]}
          locations={locations}
          showCardFn={showCardFn}
          matchedCardIndices={indexMatch}
        />
      </View>

      <Text style={styles.headline}>Attempts: {attempts}</Text>
      <Text style={styles.headline}>Matches: {matches}</Text>

    </SafeAreaView>
    </ImageBackground>
   
  );
}

const CardsContainer = ({ locations, showCardFn, matchedCardIndices, openIndices }) => {
  return (
    <>
      {locations.map((el, index) =>
        <Card
          key={index}
          index={index}
          toShow={openIndices.includes(index)}
          showCardFn={showCardFn}
          isMatched={matchedCardIndices.includes(index)}
          char={el}
        />)}
    </>
  )
}


const Card = ({ char, showCardFn, index, isMatched, toShow }) => {

  const cardPressHandler = () => {
    if (isMatched) return;
    showCardFn(index)
  }

   const image = { uri: "https://i.imgur.com/psaiAUK.png" };
   const ALREADY = { uri: "https://i.imgur.com/w48YROW.png" };


  const textReturner = () => {
    if (isMatched) return <Image
    style={styles.tinyLogo}
    source={ALREADY}
  />
    else if (toShow) return <Image
    style={styles.tinyLogo}
    source={char}
  />
    else return <Image
    style={styles.tinyLogo}
    source={image}
  />

  }

  return (
    <Pressable style={styles.card} onPress={cardPressHandler}>
      
      {textReturner()}
     
    </Pressable>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
    margin: 'auto'
  },
  tinyLogo: {
    width: '75px',
    height: '75px',
  },
  wonLogo: {
    width: '700px',
    height: '400px',
  },
  titleLogo: {
    width: '521px',
    height: '242px',
  },
 playLogo: {
    width: '150px',
    height: '100px',
  },
  gridOutline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 20,
    maxWidth: 600,
    justifyContent: 'space-between'
  },
 
    headline: {
        color: '#2F69B5', 
        textAlign: 'left', 
        fontWeight: 'bold',
        fontSize: 30,
       
    },
  card: {
    backgroundImage: 'url(https://i.imgur.com/ewEepKs.jpg)',
    backgroundSize: 'cover',
    width: '24%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',

    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },
});
