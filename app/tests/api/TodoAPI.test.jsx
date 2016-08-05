var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {
    it('should set valid todos array', () => {
      var todos = [{
        id: 23,
        text: 'test all files',
        completed: false
      }];
      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);
    });
    it('should not set invalid todos array', () => {
      var badTodos = {
        id: 24,
        text: 'test all files',
        completed: false
      };
      TodoAPI.setTodos(badTodos);
      console.log(localStorage.getItem('todos'));
      expect(localStorage.getItem('todos')).toBe(null);
    });
  });

  describe('getTodos', () => {
    it('should return an empty array for bad localStorage data', () => {
      var actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toEqual([]);
    });
    it('should return todos if valid arrat in localStorage', () => {
      var todos = [{
        id: 23,
        text: 'test all files',
        completed: false
      }];
      localStorage.setItem('todos', JSON.stringify(todos));

      var actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toEqual(todos);
    });
  });
  describe('filterTodos', () => {
    var todos = [{
      id: 1,
      text: 'some text here',
      completed: true
    }, {
      id: 2,
      text: 'Other text here',
      completed: false
    }, {
      id: 3,
      text: 'some text here',
      completed: true
    }] ;

    it('should return all items if showcompleted is true', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return only incomplete items if showcompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should find search results when search term exists', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, 'Other');
      console.log(filteredTodos);
      expect(filteredTodos.length).toBe(1);
      expect(filteredTodos[0].text).toEqual('Other text here');
    });

    it('should find search results case-insensitive when search term exists', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, 'oTHER');
      expect(filteredTodos.length).toBe(1);
      expect(filteredTodos[0].text).toEqual('Other text here');
    });

    it('should not find search results when search term does not exist', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, 'Brother');
      expect(filteredTodos.length).toBe(0);
    });

    it('should return all results when searchText is empty', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should sort by completed status', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false);
    });

  });

});
