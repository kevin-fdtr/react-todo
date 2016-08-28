import firebase, {firebaseRef} from 'app/firebase/';
import moment  from 'moment';

export var setSearchText = (searchText) => {
    return {type: 'SET_SEARCH_TEXT', searchText};
};

export var addTodo = (todo) => {
    return {
      type: 'ADD_TODO',
      todo
    };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
        text,
        completed: false,
        createdAt: moment().unix(),
        completedAt: null
    };
    var todosRef = firebaseRef.child('todos').push(todo);

    return todosRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todosRef.key
      }));
    });
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var toggleShowCompleted = () => {
    return {type: 'TOGGLE_SHOW_COMPLETED'};
};

export var toggleTodo = (id) => {
    return {type: 'TOGGLE_TODO', id};
};
