var React = require('react');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import firebase from 'app/firebase/';

import Main from 'Main';
import Login from 'Login';
import TodoApp from 'TodoApp';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
      replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
      replace('/todos');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
)
