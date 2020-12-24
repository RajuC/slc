import firebase from "firebase/app";
import "firebase/storage";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAPoKzsuM_J407JQDYtVj_v51SuQnkfF6E",
    authDomain: "srilaxmi-cars.firebaseapp.com",
    databaseURL: "https://srilaxmi-cars.firebaseio.com",
    projectId: "srilaxmi-cars",
    storageBucket: "srilaxmi-cars.appspot.com",
    messagingSenderId: "190317660302",
    appId: "1:190317660302:web:0350d27354e22d1fcbe1df",
    measurementId: "G-1SN2X8SNRN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

const storage = firebase.storage();

export { firebase, storage as default };


