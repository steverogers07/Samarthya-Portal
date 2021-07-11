import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDeMWVh96KgkO-XnAyx-SBjbm5-qxalKwo",
  authDomain: "cfg2021-de99a.firebaseapp.com",
  projectId: "cfg2021-de99a",
  storageBucket: "cfg2021-de99a.appspot.com",
  messagingSenderId: "199737548506",
  appId: "1:199737548506:web:902bcd5c085b18bbd1cfe3"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
const db = firebase.firestore();
export { db };
export default app;