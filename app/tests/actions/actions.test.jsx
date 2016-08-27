var expect = require('expect');

var actions = require('actions');

describe('Actions', () => {
    it('should generate search test action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'some search text'
        };
        var res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });
    it('should generate Add todo action', () => {
        var action = {
            type: 'ADD_TODO',
            text: 'some thing todo'
        };
        var res = actions.addTodo(action.text);

        expect(res).toEqual(action);
    });
    it('should generate ADD_TODOS action object', () => {
      var todos = [{
        id: 111,
        text: 'thing to do',
        complete: false,
        completedAt: undefined,
        createdAt: 33000
      }];
      var action = {
        type: 'ADD_TODOS',
        todos
      };
      var res = actions.addTodos(todos);

      expect(res).toEqual(action);
    });

    it('should generate toggle show compeleted action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        };
        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });
    it('should generate toggle todo action', () => {
        var action = {
            type: 'TOGGLE_TODO',
            id: 123
        };
        var res = actions.toggleTodo(action.id);

        expect(res).toEqual(action);
    });
});
