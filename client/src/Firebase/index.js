import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_vGUTDEhzLLBOEurMAMq-MLWJXhakXmA",
  authDomain: "hurricane-f3d3.firebaseapp.com",
  databaseURL: "https://hurricane-f3d3.firebaseio.com",
  projectId: "hurricane-f3d3",
  storageBucket: "hurricane-f3d3.appspot.com",
  messagingSenderId: "6599025301",
  appId: "1:6599025301:web:9b4a2bb243699265b9319c",
  measurementId: "G-7QPDNKG1YM"
  };

  // Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };