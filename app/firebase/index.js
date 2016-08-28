import firebase from 'firebase';

// Initialize Firebase
try {
  var config = {
    apiKey: "AIzaSyAH6DBXIFw8tzzUDYrVRY7nlgItIugsBF0",
    authDomain: "fdtr-todo-app.firebaseapp.com",
    databaseURL: "https://fdtr-todo-app.firebaseio.com",
    storageBucket: "fdtr-todo-app.appspot.com",
  };
  firebase.initializeApp(config);

} catch (e) {

}
export var firebaseRef = firebase.database().ref();
export default firebase;
