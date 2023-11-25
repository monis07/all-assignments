import React from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import '../AdminRegistration.css';


/// File is incomplete. You need toadd input boxes to take input for users to register.
function Register() {
    const navigate=useNavigate();
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
        console.log(e);
        setCredentials({
        ...credentials,
        [e.target.name]:e.target.value
        })   
    }

    return (
        <Card variant="outlined">
        <div className="card">
            <div className="heading">
            <h1>Admin Registration</h1>
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
                <Button variant="contained" onClick={registerUser}>Register</Button>
                </div>
                <div>
                    <h4 style={{
                        display:"inline"
                    }}>Already a User?   </h4>
                <Button variant="contained" onClick={()=>{
                        navigate('/login')
                    }}>Login</Button>
                    </div>
            </div>
        <div>
            <h2>{msg}</h2>
            </div>
    </div>
    </Card>
    );
}

export default Register;