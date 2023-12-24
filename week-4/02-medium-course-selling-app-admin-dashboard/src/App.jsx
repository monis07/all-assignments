import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import EditCourse from './components/EditCourse';
import './App.css'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';


function App() {
    return (
        <RecoilRoot>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/course/:id" element={<EditCourse />} />
            </Routes>
        </Router>
        </RecoilRoot>
    );
}

export default App;