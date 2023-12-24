import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import React from 'react';

/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const navigate=useNavigate();
    const token=localStorage.getItem('token');
    console.log(token);
    if(token){
        React.useEffect(()=>{
            navigate('/create');
        },[])
    }
    else{
    return (
        <Card variant="outlined">
            <div className='card'>
                <div className='heading'>
                    <h1>Full Stack Courses</h1>
                </div>
                <div className='buttons'>
                    <div className='register'>
                    <Button variant="contained" onClick={()=>{
                        navigate('/register')
                    }}>Register</Button>
                    </div>
                    <div className='login'>
                    <Button variant="contained" onClick={()=>{
                        navigate('/login')
                    }}>Login</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
                }
}

export default Landing;