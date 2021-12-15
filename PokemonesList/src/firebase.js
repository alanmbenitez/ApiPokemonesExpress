import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB6_akQH8kJc9w3-0ALIv6_EkYeByNQ4Eo",
  authDomain: "crud-react-dd94a.firebaseapp.com",
  projectId: "crud-react-dd94a",
  storageBucket: "crud-react-dd94a.appspot.com",  
  messagingSenderId: "227164415412",
  appId: "1:227164415412:web:3a6341fc02277469a2fee1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()


  export { auth, firebase, db, storage}