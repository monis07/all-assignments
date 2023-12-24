import React from "react";
import Navbar from './Navbar';
import { Card } from "@mui/material";
import {TextField} from "@mui/material";
import { Button } from "@mui/material";
import ShowCourses from "./ShowCourses";

function CreateCourse() {
    const [about, setAbout] = React.useState({title:'',description:'',price:''});
    const [msg,setmsg]=React.useState('');
    const [courses,setCourses]=React.useState([]);

    const token=localStorage.getItem('token');

    const fetchCourses = () => {
        fetch(`http://localhost:3000/admin/courses`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.courses);
            setCourses(data.courses);
        })
        .catch(error => {
            console.log("Error is " + error);
        });
    };

    React.useEffect(()=>{
        fetchCourses();
    },[])

    const createCourse=()=>{
            fetch(`http://localhost:3000/admin/courses`,{
        method:"POST",
            headers:
            {
                'Content-type':'application/json',
                'Authorization':"Bearer "+token
            },
            body:JSON.stringify(about)
        }).then(response=>{
            if(response.ok){
            setmsg("Course created successfully")
            fetchCourses();
            }
            else{
                setmsg("Log in again")
            }
        })
    }

    const handleInput=(e)=>{
        setAbout({
            ...about,
            [e.target.name]:e.target.value
        })
    }
    if(!token){
        return <div>Please login to create a course</div>
    }
    return (<>
        <Navbar/>

        <div style={{
            border:"3px solid red"
        }}>
        <Card variant="outlined">
    <div>
    <div className="heading">
    <h1>Create a Course</h1>
    </div>
    <div className="credentials">
        <div className="title">
        <TextField fullWidth id="outlined-basic" label="title" name="title" variant="outlined" onChange={handleInput}/>
        </div>
    <div className="description">
    <TextField fullWidth id="outlined-basic" label="description" name="description" variant="outlined" onChange={handleInput}/>
    </div>
    <div className="price">
    <TextField fullWidth id="outlined-basic" label="price" name="price" variant="outlined" onChange={handleInput}/>
    </div>
    </div>
        <div className="button1">
        <Button variant="contained" onClick={createCourse}>Create new Course</Button>
        </div>
    <div><h2>{msg}</h2></div>

</div>
</Card>
        </div>

<div>
<ShowCourses courses={courses} />
</div>
    </>
    )
}
export default CreateCourse;

