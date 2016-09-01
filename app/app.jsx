var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} =require('react-router');
var {Provider} = require('react-redux');

import Main from 'Main';
import Login from 'Login';
import TodoApp from 'TodoApp';

var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

store.dispatch(actions.startAddTodos());

// Load foundations
$(document).foundation();

// app.css
require('style!css!sass!applicationStyles')

ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <Route path="todos" component={TodoApp}/>
          <IndexRoute component={Login}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
);
