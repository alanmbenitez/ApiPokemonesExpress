import {auth, db, firebase, storage} from '../firebase'

import { GoogleAuthProvider } from '@firebase/auth'

//data inicial

const datoInicial = {
    loading: false,
    activo: false
}

const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'

//reducer 

export default function usuarioReducer (state = datoInicial, action){

    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USER_ERROR:
            return {...datoInicial}
        case USER_EXITO:
            return {...state, loading: false, user: action.payload, activo: true}
        case CERRAR_SESION:
            return {...datoInicial}
        default: 
            return {...state}
    }

}

//action  


export const accederAccion = () => async(dispatch) => {
 
    dispatch({
        type: LOADING
    })

    try {
        const provider = new firebase.auth.GoogleAuthProvider()  
        const res = await auth.signInWithPopup(provider)
        console.log(res);

        const objetoUsuario = {
            uid: res.user.uid,
            email: res.user.email,
            photoURL: res.user.photoURL,
            displayName: res.user.displayName
        }

        const usuarioDB = await db.collection('usuarios').doc(objetoUsuario.email).get()
        if(usuarioDB.exists){
            console.log(usuarioDB.data())
            dispatch({
                type: USER_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{
            console.log('no existe')
            await db.collection('usuarios').doc(res.user.email).set(objetoUsuario)
            dispatch({
                type: USER_EXITO,
                payload: objetoUsuario
            })
            localStorage.setItem('usuario', JSON.stringify(objetoUsuario))
        }

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

export const leerUsuarioActivoAccion = () => async (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USER_EXITO,
            payload: {
                user: JSON.parse(localStorage.getItem('usuario'))
            }
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    dispatch({
        type: CERRAR_SESION
    })
    localStorage.removeItem('usuario')
}

export const actualizarDisplayNameAccion = (nuevoNombre) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario
    console.log(user)
    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nuevoNombre
        })
        const usuarioEditado = {
            ...user,
            displayName: nuevoNombre
        }
        dispatch({
            type: USER_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))
    } catch (error) {
        console.log(error)
    }
}

export const actualizarFotoAccion = (imagen) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario

    try {

        const refImagen = storage.ref().child(user.email).child('foto perfil')
        await refImagen.put(imagen)
        const urlDescarga = await refImagen.getDownloadURL()

        await db.collection('usuarios').doc(user.email).update({
            photoURL: urlDescarga
        })

        const usuarioEditado = {
            ...user,
            photoURL: urlDescarga
        }
        dispatch({
            type: USER_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))

        
    } catch (error) {
        console.log(error)
    }

}
//types

