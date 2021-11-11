import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDnxLssTtNhCjAqqkuGPLeqaCOQG_ggfQ",
  authDomain: "social-media-app-20dee.firebaseapp.com",
  projectId: "social-media-app-20dee",
  storageBucket: "social-media-app-20dee.appspot.com",
  messagingSenderId: "786592649156",
  appId: "1:786592649156:web:f1ad67187b61d9c3259e91",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
