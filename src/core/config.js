import firebase from 'firebase';
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCYiJDzDo_K_KmzgzuDaOc1x-qy-TUHknc',
  authDomain: 'kiraanabazaar-51887.firebaseapp.com',
  databaseURL: 'https://kiraanabazaar-51887.firebaseio.com',
  projectId: 'kiraanabazaar-51887',
  storageBucket: 'kiraanabazaar-51887.appspot.com',
  messagingSenderId: '444199451293',
  appId: '1:444199451293:web:e315c82e1d0418ce427274',
  measurementId: 'G-HQQ3LGZMWB',
};
let app = firebase.initializeApp(FIREBASE_CONFIG);
export const db = app.database();
