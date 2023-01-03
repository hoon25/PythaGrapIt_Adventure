import {useEffect, useState} from "react";
import {Button, Form, InputGroup} from 'react-bootstrap';

import styled from 'styled-components'
import SockJs from 'sockjs-client';
import {useSelector} from "react-redux";

var Stomp = require('stompjs/lib/stomp.js').Stomp;


let ChatInput = styled(InputGroup)`
    position: fixed;
    bottom: 0;
`

var stompClient = null;


function Chat({chat}) {
    let [contents, setContents] = useState([]);
    let [messageInput, setMessageInput] = useState("");

    let user = useSelector(state => state.user);


    useEffect(() => {
        var sock = new SockJs('/ws-stomp');
        console.log("new sockjs");
        console.log(sock);
        stompClient = Stomp.over(sock);
        console.log("new stompClient");
        console.log(stompClient);

        stompClient.connect({}, () => {
            stompClient.subscribe('/sub/chat/room/' + chat.roomId, onMessageReceived)
        });
    }, []);


    function onMessageReceived(payload) {
        console.log("onMessageReceived");
        console.log(payload);
        let newMessage = JSON.parse(payload.body);
        setContents(contents => [...contents, newMessage]);
    }

    function sendMessage() {
        console.log("sendMessage");
        console.log(messageInput);
        console.log(stompClient);

        if (stompClient) {
            stompClient.send("/pub/chat/sendMessage", {},
                JSON.stringify({
                    roomId: chat.roomId,
                    sender: user.nickName,
                    message: messageInput,
                    type: 'TALK'
                })
            )
        }
    }


    return (
        <div>
            <h4>Chatting Room : {chat.roomName}입니다.</h4>
            {
                contents.map((message) => <Message message={message}/>)
            }
            <ChatInput>
                <InputGroup className="mb-3">
                    <Form.Control
                        // onChange={(e) => setMessageInput(e.target.value)}
                        onChange={function (e) {
                            console.log(stompClient);
                            console.log("start INPUT")
                            console.log(stompClient);
                            setMessageInput(e.target.value);
                            console.log("end INPUT")
                            console.log(stompClient);
                        }}
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button onClick={() =>
                        sendMessage()
                    } variant="outline-secondary" id="button-addon2">
                        Button
                    </Button>
                </InputGroup>
            </ChatInput>
        </div>
    )
}

function Message({message}) {
    return (
        <div>
            {message.message}
        </div>
    )
}

export default Chat;