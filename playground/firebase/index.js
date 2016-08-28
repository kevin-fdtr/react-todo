import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAH6DBXIFw8tzzUDYrVRY7nlgItIugsBF0",
  authDomain: "fdtr-todo-app.firebaseapp.com",
  databaseURL: "https://fdtr-todo-app.firebaseio.com",
  storageBucket: "fdtr-todo-app.appspot.com",
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Kevin',
    age: 25
  }
}).then( () => {
  console.log('Set worked')
}, (e) => {
  console.log('Set failed')
});

firebaseRef.child('todos').on('child_added', (snapshot) => {
  console.log('childadded', snapshot.key, snapshot.val());
});

var todos = [{
  text: 'walk the dog'
},{
  text: 'eat lunch'
}];

firebaseRef.child('todos').push(todos[0]);
firebaseRef.child('todos').push(todos[1]);
