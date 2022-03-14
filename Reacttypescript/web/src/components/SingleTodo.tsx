import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Todo } from "../models/models";

const SingleTodo: React.FC<{
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
   await axios.put(`/post/${id}`,{todo:editTodo});
    const { data } = await axios.get("/post");
    console.log(data);
    setTodos(data);
    setEdit(false);
  };

  const handleDelete = async(id: number) => {
    // setTodos(todos.filter((todo) => todo.id !== id));
     await axios.delete(`/post/${id}`)

    const { data } = await axios.get("/post");
    console.log(data);
    setTodos(data);

  };

  

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
          ref={inputRef}
        />
      )  : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
    
      </div>
    </form>
  );
};

export default SingleTodo;