import "./drag_drop_example.css";
import React, { useState, useRef } from "react";

export default function Example() {
  const [todoInputText, setTodoInputText] = useState("");
  const [todos, setTodos] = useState([]);

  // Add a new todo item to the list
  function handleAddTodo() {
    if (todoInputText.length > 0) {
      setTodos([
        ...todos,
        { todo: todoInputText, complete: false, isDragging: false },
      ]);
    }
  }

  // References to keep track of the dragged item and the item it is dragged over
  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();

  // Set the reference to the item currently being dragged
  function D_Start(e, index) {
    todoItemDrag.current = index;
  }

  // Update the drag-over reference and temporarily highlight the item
  function D_Enter(e, index) {
    todoItemDragOver.current = index;

    const cpArr = [...todos];
    let finalArr = [];

    cpArr.forEach((item) => {
      finalArr.push({
        todo: item.todo,
        complete: item.complete,
        isDragging: false,
      });
    });

    finalArr[index].isDragging = true;
    setTodos(finalArr);
  }

  // Perform the reordering operation after dragging ends
  function D_End(e, index) {
    const arr1 = [...todos];
    const todo_item_main = arr1[todoItemDrag.current];

    // Reorder items based on the current and over positions
    arr1.splice(todoItemDrag.current, 1);
    arr1.splice(todoItemDragOver.current, 0, todo_item_main);

    todoItemDrag.current = null;
    todoItemDragOver.current = null;

    let f_arr = [];

    arr1.forEach((item) => {
      f_arr.push({
        todo: item.todo,
        complete: item.complete,
        isDragging: false,
      });
    });

    setTodos(f_arr);
  }

  return (
    <div className="todo-container2">
      <input
        onChange={(e) => setTodoInputText(e.target.value)}
        className="input-todo-text2"
        type="text"
        placeholder="Enter a task"
      />
      <button onClick={() => handleAddTodo()} className="add-todo-button2">
        Add Task
      </button>
      <div className="display-todo-container2">
        {todos.map((todo, index) => (
          <React.Fragment key={index}>
            <h3
              draggable
              onDragStart={(e) => D_Start(e, index)}
              onDragEnter={(e) => D_Enter(e, index)}
              onDragEnd={(e) => D_End(e, index)}
              className="todo-item-text2"
            >
              {todo.todo}
            </h3>
            {todo.isDragging ? <div className="drag-indicator2"></div> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
