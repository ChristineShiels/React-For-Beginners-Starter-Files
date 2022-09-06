import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC_OyYlyH4TqB_QZCnRbN6mAeRKbfWn0Eg",
    authDomain: "catch-2-32987.firebaseapp.com",
    databaseURL: "https://catch-2-32987-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;