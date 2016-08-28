import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase, {firebaseRef} from 'app/firebase';

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

        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].todo).toInclude({
          text: todoText
        });
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
    it('should generate update todo action', () => {
        var action = {
            type: 'UPDATE_TODO',
            id: 123,
            updates: {
              compelted: false
            }
        };
        var res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action);
    });
  describe('Tests with firebase todos', () => {
    var testTodoRef;

    beforeEach( (done) => {
      testTodoRef = firebaseRef.child('todos').push();
      testTodoRef.set({
        text: 'some todo text',
        completed: false,
        createdAt: 213123
      }).then(() => done());

    });

    afterEach( (done) => {
      testTodoRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startToggleTodo(testTodoRef.key, true);
      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        });
        expect(mockActions[0].updates.completedAt).toExist();
        done();
      }, done);
    });
  });
});
