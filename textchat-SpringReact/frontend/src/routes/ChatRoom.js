import {Button, Table} from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import Chat from "./Chat";
import {LogIn, LogOut} from "./LogIn";
import {useDispatch} from "react-redux";
import {setChat} from "../store/chatSlice";


function ChatRoomList() {
    let [chatList, setChatList] = useState([]);
    let [chatRoomId, setChatRoomId] = useState("");
    let navigate = useNavigate();


    useEffect(() => getAllChatRoom(),
        []);
    // getAllChatRoom();

    function getAllChatRoom(){
        axios.get("/chat").then(res => {
            setChatList(res.data);
            console.log(res.data)
        });
    }
    // axios.get("/chat").then(res => {
    //     setChatList(res.data);
    //     console.log(res.data)
    // });

    return (
        <>
            <Button variant="danger"
                    onClick={() => axios.post("/chat/room", {"roomName": "AutoCreate"})
                        .then(() => getAllChatRoom())}>
                채팅방 생성하기
            </Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>채팅방 NO</th>
                    <th>채팅방 이름</th>
                    <th>입장하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    chatList.map((chat, i) => <ChatRoom chat={chat} i={i} />)
                }
                </tbody>
            </Table>



        </>
    );
}

function ChatRoom({chat, i}) {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    return (
        <>
            <tr>
                <td></td>
                <td>{i}</td>
                <td>{chat.roomName}</td>
                <td><Button variant="primary" onClick={function () {
                    dispatch(setChat(chat));
                    navigate(`/chat/room/${chat.roomId}`);
                }
                }>입장하기</Button></td>
            </tr>
        </>
    );
}

export default ChatRoomList;