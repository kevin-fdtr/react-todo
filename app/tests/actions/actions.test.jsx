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
    it('should generate login action', () => {
        var action = {
            type: 'LOGIN',
            uid: 'abc123'
        };
        var res = actions.login(action.uid);

        expect(res).toEqual(action);
    });
    it('should generate logout action', () => {
        var action = {
            type: 'LOGOUT'
        };
        var res = actions.logout();

        expect(res).toEqual(action);
    });

  describe('Tests with firebase todos', () => {
    var testTodoRef;
    var uid;
    var todosRef;

    beforeEach( (done) => {
      var credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_ACCESS_TOKEN);

      firebase.auth().signInWithCredential(credential).then((user) => {
        uid = user.uid;
        todosRef = firebaseRef.child(`users/${uid}/todos`);
        return todosRef.remove();
      }).then(() => {
        testTodoRef = todosRef.push();
        testTodoRef.set({
          text: 'some todo text',
          completed: false,
          createdAt: 213123
        });
      })
      .then(() => done())
      .catch(done);
    });

    afterEach( (done) => {
      todosRef.remove().then(() => done());
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
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

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
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

    it('should add todos to data base and dispatch ADD_TODOS', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddTodos();
      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('some todo text');
        done();
      }, done);
    });
  });
});
