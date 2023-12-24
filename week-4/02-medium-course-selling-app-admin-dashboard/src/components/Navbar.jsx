import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
function Navbar(){
    const [user,setUser]=React.useState('');
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
    const logout=()=>{
            localStorage.removeItem('token');
            navigate('/login');
    }
    React.useEffect(()=>{
        fetch("http://localhost:3000/admin/me",{
            method:"GET",
            headers:
            {
                'Content-type':'application/json',
                'Authorization':"Bearer "+token
            }
        }).then(response=>{
            if(response.ok){
                console.log(response);
                return response.json();
            }
    }).then(data=>{
        setUser(data.username);
    })     
},[])
    return (
    <div style={{
        display:"flex",
        justifyContent:"space-between",
        padding:"10px",
        border:"1px solid black",
        margin:"2px",
        borderRadius:"5px"
    }}>
        <div>
            <h2 style={{
                display:"inline"
            }}>Coursera</h2>
        </div>
        <div>
        {user}<Button variant="contained" onClick={logout}>Log Out</Button>
        </div>
    </div>
    )
}
export default Navbar;