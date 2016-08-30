var todos = {
  '123': {
    text: 'Hi',
    compelted: false
  },
  '124': {
    text: 'Bye',
    compelted: true
  },
  '125': {
    text: 'Oh',
    compelted: false
  }
}

var todoKeys = Object.keys(todos);
// var todoValues = Object.values(todos);

console.log('todos', todos);
console.log('keys', todoKeys);

var filteredTodos = todos;
filteredTodos = filteredTodos.filter((todo) => {
  return  searchText.length === 0 ||
          todo.text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
});

// console.log('values', todoValues);
