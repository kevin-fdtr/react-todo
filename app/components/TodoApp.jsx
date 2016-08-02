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
        text: 'Walk the dog',
        completed: false
      }, {
        id: uuid(),
        text: 'Make bread',
        completed: true
      }, {
        id: uuid(),
        text: 'Read a book',
        completed: true
      }, {
        id: uuid(),
        text: 'Swim with Girls',
        completed: false
      } ]
    };
  },
  handleAddTodo: function (text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
            id: uuid(),
            text: text,
            completed: false
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
  handleToggle: function (id) {
    var updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
    // alert(id);
  },
  render: function() {
    var {todos} = this.state;
    return (
      <div className="row">
        <div className="column small-centered medium-6 large-4">
          <TodoSearch onSearch={this.handleSearch}/>
          <TodoList todos={todos} onToggle={this.handleToggle}/>
          <TodoAddForm onAddTodo={this.handleAddTodo}/>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
