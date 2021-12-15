import './App.css';

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Login from './components/Login';
import Navbar from './components/Navbar';
import Perfil from './components/Perfil.jsx';
import Pokemon from './components/Pokemon.jsx';
import Pokemones from './components/Pokemones'
import React from 'react'
import {auth} from './firebase'

const App = () => {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () =>{
      auth.onAuthStateChanged(user => {
        console.log(user)
        if(user){
            setFirebaseUser(user)
        }else{
            setFirebaseUser(null)
        }
    })
    }
    fetchUser()
  }, [])

  const RutaProtegida = ({component, path, ...rest}) => {
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        console.log('son iguales')
        return <Route component={component} path={path} {...rest} />
      }else{
        console.log('no exite')
        return <Redirect to="/login" {...rest} />
      }
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }
  const boxContainer = {
    backgroundColor: '#dbe7e882',
  }
  
  return firebaseUser !== false ? (
    <Router>
      <div style={boxContainer} className="container mt-3">
      <Navbar/>
        <Switch>
          <Route component={Pokemones} path="/inicio" exact/>
          <Route component={Pokemon} path="/pokemon"/>
          <Route component={Perfil} path="/perfil" exact/>

          <Route component={Login} path="/login" exact/>
        </Switch>
      </div>
    </Router>
  ) : (
    <div>
      Cargando ... 
    </div>
  )
}

export default App;
