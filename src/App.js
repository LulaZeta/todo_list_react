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

  //Run ONCE when the app start
  useEffect(() => {
    getLocalTodos();
  },[]);

  //UseEffect
  useEffect(() => {
   filterHandler();
   saveLocalTodos();
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
//Save to LOCAL
  const saveLocalTodos = () => {
         localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      console.log("LOCALSTORAGE------", todoLocal);
      if(todoLocal.length === 0) {
        return null;
      }
      setTodos(todoLocal);
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
