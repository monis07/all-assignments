import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Navbar(){
    const navigate=useNavigate();
    const logout=()=>{
            localStorage.removeItem('token');
            navigate('/login');
    }
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
        <Button variant="contained" onClick={logout}>Log Out</Button>
        </div>
    </div>
    )
}
export default Navbar;