import React from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import '../AdminRegistration.css';

function Login() {
    const navigate=useNavigate();
   
    const [credentials, setCredentials] = React.useState({username:'',password:''});
    const [msg,setmsg]=React.useState('');
    
    const loginUser=()=>{
        axios.post(`http://localhost:3000/admin/login`,credentials).then(response=>{
           const token=response.data.token;
           localStorage.setItem('token',token);
           navigate('/create')
        }).catch(error=>{
            console.log(error);
            setmsg(error.response.data.message)
        })
    }
    const handleInput=(e)=>{
        setCredentials({
        ...credentials,
        [e.target.name]:e.target.value
        })   
    }


    return (
        <Card variant="outlined">
        <div className="card">
            <div className="heading">
            <h1>Login to Admin Dashboard</h1>
            </div>
            <div className="credentials">
                <div className="email">
                <TextField fullWidth id="outlined-basic" label="username" name="username" variant="outlined" onChange={handleInput}/>
                </div>
            <div className="password">
            <TextField fullWidth id="outlined-basic" label="password" name="password" variant="outlined" onChange={handleInput}/>
            </div>
            </div>
            <div className="buttons-registration">
                <div className="button1">
                <Button variant="contained" onClick={loginUser}>Login</Button>
                </div>
                <div>
                    <h4 style={{
                        display:"inline"
                    }}>Not a User?   </h4>
                <Button variant="contained" onClick={()=>{
                        navigate('/register')
                    }}>Register</Button>
                    </div>
            </div>
            <div><h2>{msg}</h2></div>
    </div>
    </Card>
    );
}

export default Login;
