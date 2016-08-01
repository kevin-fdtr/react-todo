var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var TodoAddForm = require('TodoAddForm');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass( {
  getInitialState: function () {
    return {
      showCompleted: false,
      searchText: '',
      todos: [ {
        id: uuid(),
        text: 'Walk the dog'
      }, {
        id: uuid(),
        text: 'Make bread'
      }, {
        id: uuid(),
        text: 'Read a book'
      }, {
        id: uuid(),
        text: 'Swim with Girls'
      } ]
    };
  },
  handleAddTodo: function (text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
            id: uuid(),
            text: text
        }
      ]
    });
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    })
  },
  render: function() {
    var {todos} = this.state;
    return (
      <div className="row">
        <div className="column small-centered medium-6 large-4">
          <TodoSearch onSearch={this.handleSearch}/>
          <TodoList todos={todos} />
          <TodoAddForm onAddTodo={this.handleAddTodo}/>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
