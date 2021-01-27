import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAme7Gdlc81znTeSk-q-khT9v3gFiD0gb8",
    authDomain: "whats-app-clone-b2338.firebaseapp.com",
    projectId: "whats-app-clone-b2338",
    storageBucket: "whats-app-clone-b2338.appspot.com",
    messagingSenderId: "236161902129",
    appId: "1:236161902129:web:31372308b20f401602d710",
    measurementId: "G-NRGV19ZDGY"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;

