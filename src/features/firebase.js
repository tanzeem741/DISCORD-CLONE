import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCcEo2Zkjm0dOMbfiNH6dorEDGCSwkQJTo",
  authDomain: "discord-clone-14d85.firebaseapp.com",
  projectId: "discord-clone-14d85",
  storageBucket: "discord-clone-14d85.appspot.com",
  messagingSenderId: "955534873592",
  appId: "1:955534873592:web:5e188100fc779199573c0d",
  measurementId: "G-KVC2X6N0DW"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db= firebaseApp.firestore();
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();

export { auth , provider };
export default db;