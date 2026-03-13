import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);

  function handleAddButton(e) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    setTodos((prevTodo) => [
      ...prevTodo,
      { id: Date.now(), text: trimmedValue },
    ]);

    setValue('');
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddButton();
    }
  };
  const deleteTodo = (id) => {
    return setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="todo_list_content">
      <div className="todo_list_content_fields">
        <input
          type="text"
          placeholder="Enter task"
          className="todo_input_box"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => handleAddButton()}
          className="add_btn"
          disabled={!value.trim()}
        >
          Add
        </button>
      </div>
      {todos.length === 0 && <p className="empty_state">No tasks yet</p>}
      <ul className="todos">
        {todos.map((todo) => (
          <TodoItem todo={todo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
