import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowCourses from "./ShowCourses";

function Login() {
    const navigate=useNavigate();
   
    const [credentials, setCredentials] = React.useState({username:'',password:''});
    
    const loginUser=()=>{
        axios.post(`http://localhost:3000/admin/login`,credentials).then(response=>{
           console.log(response.data.message);
           const token=response.data.token;
           console.log("The type of token is on login "+typeof(token));
           console.log(token);
           localStorage.setItem('token',token);
           navigate('/courses')
        })
    }
    const handleInput=(e)=>{
        setCredentials({
        ...credentials,
        [e.target.name]:e.target.value
        })   
    }


    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        <label htmlFor="username">Username or E-mail:</label>
        <br />
        <input type={"text"} id="username" name="username" onChange={handleInput} />
        <br/>
        <label htmlFor="password">Password:</label>
        <br />
        <input type={"text"} name="password" id="password" onChange={handleInput} />
        <br />
        <br />
        <button onClick={loginUser}>Login</button>
        Not a user? <a href="/register">Register</a>
    </div>
}

export default Login;