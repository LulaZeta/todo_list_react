import { useState, useEffect } from 'react';
import './App.css';

//Importing Components
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {

  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterdTodos, setFilteredTodos] = useState([]);

  //UseEffect
  useEffect(() => {
   filterHandler();
  }, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }
  return (
    <div className="App">
      <header>
      <h1>Todo List</h1>
      </header>
      <Form todos= {todos} setTodos={setTodos} setInputText={setInputText} inputText={inputText} setStatus={setStatus} />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filterdTodos} />
    </div>

  );
}

export default App;
