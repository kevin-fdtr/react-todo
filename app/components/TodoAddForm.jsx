var React = require('react');

var TodoAddForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var strTodo = this.refs.todo.value;
    if (strTodo.length > 0) {
      this.refs.todo.value = '';
      this.props.onAddTodo(strTodo);
    } else {
      this.refs.todo.focus();
    }
  },
  render: function () {
    return (
      <div>
        <form ref="form" onSubmit={this.handleSubmit} className="container__footer">
          <input type="text" ref="todo" placeholder="Add something to do"/>
          <button className="button expanded">Add</button>
        </form>
      </div>
    );
  }
});

module.exports = TodoAddForm;
