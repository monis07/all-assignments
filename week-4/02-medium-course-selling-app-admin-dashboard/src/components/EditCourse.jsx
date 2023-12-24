import Navbar from "./Navbar";
import {useParams} from "react-router-dom";
import React from "react";
import {TextField,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditCourse(){
    const navigate=useNavigate();
    let {id}=useParams();
    const token=localStorage.getItem('token');
    const [course,setcourse]=React.useState([]);
    const [editc,seteditc]=React.useState({title:'',description:'',price:''});

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
            for(let i=0;i<data.courses.length;i++){
                if(data.courses[i].id == id){
                    console.log(data.courses[i]);
                    setcourse(data.courses[i]);
                }
            }
        }).catch(error => {
            console.log("Error is " + error);
        });
    };

    React.useEffect(()=>{
        fetchCourses();
    },[]);

    const handleInput=(e)=>{
        seteditc({
            ...editc,
            [e.target.name]:e.target.value
        })
    }

    const editcourse=()=>{
        fetch("http://localhost:3000/admin/courses/"+id,{
            method:"PUT",
            headers:
            {
                'Content-type':'application/json',
                'Authorization':"Bearer "+token
            },
            body:JSON.stringify(editc)
        }).then(response=>response.json()).then(data=>{
            console.log(data.message);
            fetchCourses();
        }) 
    }
    const deleteCourse=()=>{
        fetch("http://localhost:3000/admin/courses/"+id,{
            method:"DELETE",
            headers:
            {
                'Content-type':'application/json',
                'Authorization':"Bearer "+token
            }
        }).then(response=>response.json()).then(data=>{
            navigate('/create')
            console.log(data.message);
        })
    }  
    if(!token){
        return <div>Please login to edit a course</div>
    }
    return(<>
        <Navbar/>
        <div style={{
        display:"flex",
        flexWrap:"wrap"
    }}>
            <div><Course title={course.title} description={course.description} price={course.price}></Course>
            <Button color="error" variant="contained" onClick={deleteCourse}>Delete</Button>
            </div>
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
    <Button variant="contained" onClick={editcourse}>Edit</Button>
    </div>
        </>
    )
}

function Course(props) {
    return <div style={{
        border:"2px solid green",
        padding:"15px",
        width:"29vw",
        margin:"5px"
    }}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>Price:{props.price}</p>
    </div>
}

export default EditCourse;


