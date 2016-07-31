var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoAddForm = require('TodoAddForm');

describe('TodoAddForm', () => {
  it('should exist', () => {
    expect(TodoAddForm).toExist();
  });

  it('should call onAddTodo if valid todo entered', () => {
  var spy = expect.createSpy();
  var todoAddForm = TestUtils.renderIntoDocument(<TodoAddForm onAddTodo={spy}/>);
  var $el = $(ReactDOM.findDOMNode(todoAddForm));

  todoAddForm.refs.todo.value = 'New something to do';
  TestUtils.Simulate.submit($el.find('form')[0]);

  expect(spy).toHaveBeenCalledWith('New something to do');
  });

  it('should not call onAddTodo if invalid todo entered', () => {
  var spy = expect.createSpy();
  var todoAddForm = TestUtils.renderIntoDocument(<TodoAddForm onAddTodo={spy}/>);
  var $el = $(ReactDOM.findDOMNode(todoAddForm));

  todoAddForm.refs.todo.value = '';
  TestUtils.Simulate.submit($el.find('form')[0]);

  expect(spy).toNotHaveBeenCalled();
  });

});
