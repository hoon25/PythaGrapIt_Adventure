import './App.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {LogIn, LogOut} from './routes/LogIn';
import ChatRoom from "./routes/ChatRoom";
import Chat from "./routes/Chat";

import NavScroll from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import LandingPage from './pages/LandingPage'

function App() {
    let user = useSelector(state => state.user);
    let chat = useSelector(state => state.chat);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    return (
        <div className="App">
        <NavScroll/>
            
            <Routes>
                <Route exact path="/" element={ <LandingPage />} />
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="/chat" element={<ChatRoom/>}/>
                <Route path="/chat/room/:roomId" element={<Chat chat={chat}/>}/>
            </Routes>
        </div>
    );
}

export default App;
