var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');
import * as actions from 'actions';

var {TodoAddForm} = require('TodoAddForm');

describe('TodoAddForm', () => {
  it('should exist', () => {
    expect(TodoAddForm).toExist();
  });

  it('should dispatch ADD_TODO if valid todo entered', () => {
  var todoText = 'Check Mail';
  var action = actions.startAddTodo(todoText);
  var spy = expect.createSpy();
  var todoAddForm = TestUtils.renderIntoDocument(<TodoAddForm dispatch={spy}/>);
  var $el = $(ReactDOM.findDOMNode(todoAddForm));

  todoAddForm.refs.todo.value = todoText;
  TestUtils.Simulate.submit($el.find('form')[0]);

  expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch ADD_TODO if invalid todo entered', () => {
  var spy = expect.createSpy();
  var todoAddForm = TestUtils.renderIntoDocument(<TodoAddForm dispatch={spy}/>);
  var $el = $(ReactDOM.findDOMNode(todoAddForm));

  todoAddForm.refs.todo.value = '';
  TestUtils.Simulate.submit($el.find('form')[0]);

  expect(spy).toNotHaveBeenCalled();
  });

});
