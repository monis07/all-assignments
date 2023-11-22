import React from "react";
import axios from 'axios';

function CreateCourse() {
    const [about, setAbout] = React.useState({title:'',description:'',price:''});
    const [msg,setmsg]=React.useState('');

    const token=localStorage.getItem('token');
    console.log("The type of token in createcourses "+typeof(token));
    const headers={
        'content-type':'application/json',
        'accept':'application/json',
        'Authorization':`Bearer ${token}`
    }
    console.log(headers)

    const createCourse=()=>{
        axios.post(`http://localhost:3000/admin/courses`,{
        method:"POST",
            headers:
            {
                'Authorization':"Bearer"+{token}
            }
        }).then(response=>{
            console.log(response.data.message);
            setmsg(response.data.message);
        }).catch(error=>{
            setmsg(error.response.data)
        })
    }

    const handleInput=(e)=>{
        setAbout({
            ...about,
            [e.target.name]:e.target.value
        })
    }
    return <div>
        <h1>Create Course Page</h1>
        <label htmlFor="title">Title of the course: </label>
        <input type={"text"} name="title" onChange={handleInput} />
        <br />
        <br />
        <label htmlFor="description">Description of the course: </label>
        <input type={"text"} onChange={handleInput} />
        <br />
        <br />
        <label htmlFor="price">Price of the course: </label>
        <input type={"text"} onChange={handleInput} />
        <br />
        <br />
        <button onClick={createCourse}>Create Course</button>
        <br />
        <br />
        <div>{msg}</div>
    </div>
}
export default CreateCourse;