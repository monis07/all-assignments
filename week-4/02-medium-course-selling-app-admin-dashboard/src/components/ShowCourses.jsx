import { Button } from "@mui/material";

function ShowCourses({courses}) { 
    return <div style={{
        display:"flex",
        flexWrap:"wrap"
    }}>
        {courses.map((c) => {
        return <Course title={c.title} description={c.description} price={c.price}/>
        })}
    </div>
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
        <Button variant="contained">Edit</Button>


    </div>
}

export default ShowCourses;