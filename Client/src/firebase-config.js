
import firebase from 'firebase';
import 'firebase/storage';


  var firebaseConfig = {
    apiKey: "AIzaSyCWZ3lH_vyZXP24mDhL4uadr_IzBJPG-CA",
    authDomain: "plutoimage-fdb0b.firebaseapp.com",
    databaseURL: "https://plutoimage-fdb0b.firebaseio.com",
    projectId: "plutoimage-fdb0b",
    storageBucket: "plutoimage-fdb0b.appspot.com",
    messagingSenderId: "9210184899",
    appId: "1:9210184899:web:26f06bcacd063b7141ce76"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 var storage = firebase.storage();
 export {storage, firebase as default}

