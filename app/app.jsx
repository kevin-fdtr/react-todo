var React = require('react');
var ReactDOM = require('react-dom');
var {hashHistory} =require('react-router');
var {Provider} = require('react-redux');
import firebase from 'app/firebase/';

import router from 'app/router/';

var actions = require('actions');
var store = require('configureStore').configure();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    hashHistory.push('/todos');
  } else {
    hashHistory.push('/');
  }
});

store.dispatch(actions.startAddTodos());

// Load foundations
$(document).foundation();

// app.css
require('style!css!sass!applicationStyles')

ReactDOM.render(
    <Provider store={store}>
      {router}
    </Provider>,
    document.getElementById('app')
);
