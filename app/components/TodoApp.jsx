var React = require('react');

var TodoList = require('TodoList');
var TodoAddForm = require('TodoAddForm');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass( {
  getInitialState: function () {
    return {
      showCompleted: false,
      searchText: '',
      todos: [ {
        id: 1,
        text: 'Walk the dog'
      }, {
        id: 2,
        text: 'Make bread'
      }, {
        id: 3,
        text: 'Read a book'
      }, {
        id: 4,
        text: 'Swim with Girls'
      } ]
    };
  },
  handleAddTodo: function (text) {
    alert('new Todo: ' + text);
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
