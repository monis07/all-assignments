import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ShowCourses({courses}) {
    return <div style={{
        display:"flex",
        flexWrap:"wrap"
    }}>
        {courses.map((c) => {
        return <Course title={c.title} description={c.description} price={c.price} id={c.id}/>
        })}
    </div>
}

function Course(props) {
    const navigate=useNavigate();

    const editCourse=()=>{
        navigate(`/course/${props.id}`)
    }
    

    
    return <div style={{
        border:"2px solid green",
        padding:"15px",
        width:"29vw",
        margin:"5px"
    }}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>Price:{props.price}</p>
        <p>{props.id}</p>
        <Button variant="contained" onClick={editCourse}>Edit</Button>
            </div>
}

export default ShowCourses;