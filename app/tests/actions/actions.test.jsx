import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var expect = require('expect');
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

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
            todo: {
              id: 'acs123',
              text: 'some thing todo',
              completed: false,
              createdAt: 0
            }
        };
        var res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({});
      const todoText = 'My Todo item';
      store.dispatch(actions.startAddTodo(todoText)).then( () => {
        const actions = store.getActions();

        // commented code below throws an error:
        // Error: The "actual" argument in expect(actual).toInclude() must be an array or a string
        // console.log('First expect', actions[0]);
        // expect(actions[0]).toInclude({
        //   type: 'ADD_TODO'
        // });

        // alternate test
        expect(actions[0].type).toEqual('ADD_TODO');

        // commented code below throws an error:
        // Error: The "actual" argument in expect(actual).toInclude() must be an array or a string
        // console.log('First expect', actions[0]);
        // expect(actions[0].todo).toInclude({
        //   text: todoText
        // });

        // alternate test
        expect(actions[0].todo.text).toEqual(todoText);

        done();
      }).catch(done);

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
