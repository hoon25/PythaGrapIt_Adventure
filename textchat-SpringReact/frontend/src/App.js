import './App.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {LogIn, LogOut} from './routes/LogIn';
import ChatRoom from "./routes/ChatRoom";
import Chat from "./routes/Chat";
import RTC from "./routes/RTC";
import TestOverlay from "./routes/TestOverlay";

function App() {
    let user = useSelector(state => state.user);
    let chat = useSelector(state => state.chat);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    return (
        <div className="App">

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")}>PitaGrapIt</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate("/chat")}>Chat</Nav.Link>
                        <Nav.Link onClick={() => navigate("/test")}>test</Nav.Link>
                    </Nav>
                </Container>
                <Nav>
                    {
                        user.nickName == null
                            ? <Nav.Link onClick={() => navigate("/login")}>로그인</Nav.Link>
                            : <Nav.Link onClick={() => navigate("/logout")}>{user.nickName}  로그아웃</Nav.Link>
                    }
                </Nav>
            </Navbar>
            <Routes>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="/chat" element={<ChatRoom/>}/>
                <Route path="/chat/room/msg/:roomId" element={<Chat chat={chat}/>}/>
                <Route path="/chat/room/rtc/:roomId" element={<RTC chat={chat}/>}/>

            </Routes>
        </div>
    );
}

export default App;
