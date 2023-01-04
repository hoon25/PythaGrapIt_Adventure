import {Button, Form, Table} from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setChat} from "../store/chatSlice";



function ChatRoomList() {
    let [chatList, setChatList] = useState([]);
    let [createRoomType, setCreateRoomType] = useState("");
    let navigate = useNavigate();


    useEffect(() => getAllChatRoom(),
        []);

    // getAllChatRoom();

    function getAllChatRoom() {
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
            <input type='radio'
                   name='chatRoomType'
                   value='text' onClick={()=>setCreateRoomType("MSG")}/> 텍스트채팅
            <input type='radio'
                   name='chatRoomType'
                   value='text' onClick={()=>setCreateRoomType("RTC")}/> 영상채팅
            <input type='radio'
                   name='chatRoomType'
                   value='video' onClick={()=>setCreateRoomType("BOTH")}/> 텍스트영상채팅
            <Button variant="danger"
                        onClick={() => axios.post("/chat/room", {"chatType": createRoomType})
                            .then(() => getAllChatRoom())}>
                    채팅방 생성하기
            </Button>




            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>채팅방 NO</th>
                    <th>채팅방 종류</th>
                    <th>채팅방 이름</th>
                    <th>입장하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    chatList.map((chat, i) => <ChatRoom chat={chat} i={i}/>)
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
                <td>{chat.chatType}</td>
                <td>{chat.roomName}</td>
                <td><Button variant="primary" onClick={function () {
                    dispatch(setChat(chat));
                    if(chat.chatType === "MSG") {
                        navigate(`/chat/room/msg/${chat.roomId}`);
                    }
                    else if(chat.chatType === "RTC") {
                        navigate(`/chat/room/rtc/${chat.roomId}`);
                    }
                }
                }>입장하기</Button></td>
            </tr>
        </>
    );
}

export default ChatRoomList;