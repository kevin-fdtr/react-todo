var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

describe('Reducers', () => {
    describe('Search text', () => {
        it('should set search text', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'some search text'
            };
            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });
    });
    describe('Show completed', () => {
        it('should toggle show completed', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };
            var res = reducers.showCompletedReducer(df(true), df(action));

            expect(res).toEqual(false);
            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);
        });
    });

    describe('todosReducer', () => {
        it('should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                  id: 'abc12345',
                  text: 'Walk the dog',
                  completed: false,
                  createdAt: 9234123
                }
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });
        it('should update todo', () => {
            var todos = [
                {
                    id: 1,
                    text: 'Do something',
                    completed: false,
                    createdAt: 123,
                    completedAt: 125
                }, {
                    id: 2,
                    text: 'Check Email',
                    completed: false,
                    createdAt: 123,
                    completedAt: 125
                }, {
                    id: 3,
                    text: 'Walk dog',
                    completed: false,
                    createdAt: 123,
                    completedAt: 125
                }
            ];
            var updates = {
              completed: false,
              completedAt: null
            };
            var action = {
                type: 'UPDATE_TODO',
                id: todos[1].id,
                updates
            };
            var res = reducers.todosReducer(df(todos), df(action));
            expect(res[0].completed).toEqual(todos[0].completed);
            expect(res[0].completedAt).toEqual(todos[0].completedAt);
            expect(res[0].text).toEqual(todos[0].text);
            expect(res[1].completed).toEqual(updates.completed);
            expect(res[1].completedAt).toEqual(updates.completedAt);
            expect(res[1].text).toEqual(todos[1].text);
            expect(res[2].completed).toEqual(todos[2].completed);
            expect(res[2].completedAt).toEqual(todos[2].completedAt);
            expect(res[2].text).toEqual(todos[2].text);
        });
        it('should add existing todos', () => {
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
          var res = reducers.todosReducer(df([]), df(action));

          expect(res.length).toEqual(1);
          expect(res[0]).toEqual(todos[0]);
        });
    });
});
