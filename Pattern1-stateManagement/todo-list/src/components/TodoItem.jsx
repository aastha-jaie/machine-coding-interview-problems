const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <li className="todo_item" key={todo.id}>
      {todo.text}
      <button
        className="delete-btn"
        onClick={deleteTodo.bind(null, todo.id)}
        aria-label="Delete todo"
      >
        🗑️
      </button>
      <hr />
    </li>
  );
};

export default TodoItem;
