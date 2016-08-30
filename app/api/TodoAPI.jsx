var $ = require('jquery');

module.exports = {
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

    filteredTodos = filteredTodos.filter((todo) => {
      return  searchText.length === 0 ||
              todo.text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });

    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    filteredTodos.sort((a,b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if ( a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });
    return filteredTodos;
  }
}
