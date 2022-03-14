import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import InputFeild from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const { data } = await axios.post("/post", { todo });
      console.log(data);
      setTodos([...todos, data]);
      setTodo("");
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get("/post");
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="App">
      <span className="heading">Todo app</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
