import React,{ useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo,setnewTodo]=useState({title:'',description:''})

    // fetch all todos from server
    React.useEffect(()=>{
      fetchTodo();
    },[]);

    const fetchTodo=()=>{
      axios.get("http://localhost:3001/todos").then((response)=>{
          setTodos(response.data);
          console.log(response.data);
      }
        )
      }

      //delete todo with the help of id
      const deleteTodo=(id)=>{
        axios.delete(`http://localhost:3001/todos/${id}`).then((response)=>{
            console.log(response);
            fetchTodo();
          })
        }

        //handle input box text and putting the text in input variable in newTodo state variable
        const handleInputchange=(e)=>{
          setnewTodo({
            ...newTodo,
            [e.target.name]: e.target.value
          }
          )
        }

        //to add new todo with the help of a button
        const addnewTodo=()=>{
          axios.post(`http://localhost:3001/todos`,newTodo).then(response=>{
            console.log(response)
            fetchTodo()
          })
        }

  return (
    <>
      <div>
        <h1>Easy To-do App</h1>
          <label htmlFor="title">Enter the title</label>
          <br />
        <input type="text" id="title" name="title" placeholder='Title' onChange={handleInputchange}/>
        <br />
        <br />
        <label htmlFor="description">Enter the description</label>
          <br />
        <input type="text" id="description" name="description" placeholder='Description' onChange={handleInputchange}/>
        <br />
        <br />
        <button onClick={addnewTodo} disabled={!newTodo.title || !newTodo.description}>Add new To-do</button>
        {todos.map((todo)=>{
          return <Todo title={todo.title} description={todo.description} delete={()=>{deleteTodo(todo.id)}}></Todo>
        })}
      </div>
    </>
  )
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return <div>
        {props.title}
        <br />
        {props.description}
        <br />
        <button onClick={props.delete}>Done</button>
    </div>
}
export default App
