import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
    const navigate=useNavigate();
    const [courses, setCourses] = React.useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    axios.get(`http://localhost:3000/admin/courses`).then(response=>{
        setCourses(response.data.courses);
    })
    return <div>
        <h1>Create Course Page</h1>
        {courses.map(c => <Course title={c.title} />)}
        <button onClick={()=>{navigate('/about')}}>Create a new Course</button>
    </div>
}

function Course(props) {
    return <div>
        <h1>{props.title}</h1>
    </div>
}

export default ShowCourses;