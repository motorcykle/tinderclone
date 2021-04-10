import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAzLH9KVE7PQIBQdYbEtsX2maTFHcblx3k",
  authDomain: "tindercloneting.firebaseapp.com",
  projectId: "tindercloneting",
  storageBucket: "tindercloneting.appspot.com",
  messagingSenderId: "748587504770",
  appId: "1:748587504770:web:ee4c11b84e3375c0e0909b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();
const storeage = firebaseApp.storage();
const auth = firebaseApp.auth();

export { auth, storeage, provider };
export default db;
