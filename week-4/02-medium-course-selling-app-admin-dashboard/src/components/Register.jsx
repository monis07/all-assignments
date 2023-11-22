import React from "react";
import axios from 'axios';

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [credentials, setCredentials] = React.useState({username:'',password:''});
    const [msg,setmsg]=React.useState('');

    const registerUser=()=>{
        axios.post(`http://localhost:3000/admin/signup`,credentials).then(response=>{
           console.log(response.data.message);
           setmsg(response.data.message);
        }).catch(error=>{
            console.log(error.response.data.message);
            setmsg(error.response.data.message);
        })
    }

    const handleInput=(e)=>{
        setCredentials({
        ...credentials,
        [e.target.name]:e.target.value
        })   
    }

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <label htmlFor="username">Username or E-mail:</label>
        <br />
        <input type={"text"} name="username" id="username" onChange={handleInput} />
        <br/>
        <label htmlFor="password">Password:</label>
        <br />
        <input type={"text"} name="password" id="password" onChange={handleInput} />
        <br />
        <br />
        <button onClick={registerUser}>Register</button>
        Already a user? <a href="/login">Login</a>
        <br />
        <br />
        <div>{msg}</div>
    </div>
}

export default Register;