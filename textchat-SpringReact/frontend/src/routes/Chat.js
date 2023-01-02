import {useState, useEffect} from "react";
import {Button, Form, InputGroup} from 'react-bootstrap';

import styled from 'styled-components'
import SockJs from 'sockjs-client';
import {useSelector} from "react-redux";
var Stomp = require('stompjs/lib/stomp.js').Stomp;




let ChatInput = styled(InputGroup)`
    position: fixed;
    bottom: 0;
`

function Chat({chat}) {
    let [messageList, setMessageList] = useState([]);
    let [messageInput, setMessageInput] = useState("");
    let [stompClient, setStompClient] = useState(null);

    let user = useSelector(state => state.user);

    useEffect(() => {
        connect();
    }, []);


    function connect() {
        var sock = new SockJs('/ws-stomp');
        stompClient = Stomp.over(sock)
        stompClient.connect({}, onConnected, onError);
        console.log("connect")
        console.log(stompClient);
    }

    function onConnected() {
        stompClient.subscribe('/sub/chat/room/' + chat.roomId, onMessageReceived);
        stompClient.send("/pub/chat/enterUser", {},
            JSON.stringify({
                roomId: chat.roomId,
                sender: user.nickName,
                type: 'ENTER'
            })
        )
    }

    function onError() {
        console.log("error");
    }

    function onMessageReceived(payload) {
        console.log("onMessageReceived");
        console.log(payload);
        let newMessage = JSON.parse(payload.body);
        let copy = [...messageList];
        copy.push(newMessage);
        setMessageList(copy);
        console.log(messageList);
    }

    function sendMessage() {
        console.log("sendMessage");
        console.log(messageInput);
        console.log(stompClient);

        if(stompClient){
            stompClient.send("/sub/chat/sendMessage", {},
                JSON.stringify({
                    roomId: chat.roomId,
                    sender: user.nickName,
                    message: messageInput,
                    type: 'CHAT'
                })
            )
        }

        console.log("sendMessage end!!");
    }

    return (
        <div>
            <h4>Chatting Room : {chat.roomName}입니다.</h4>
            {
                messageList.map((message) => <Message message={message}/>)
            }
            <ChatInput>
                <InputGroup className="mb-3">
                    <Form.Control
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button onClick={()=>
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
            {message.sender} : {message.message}
        </div>
    )
}


// var stompClient = null;
//
// function connect(event){
//     console.log("connect");
//     event.preventDefault();
//     let socket = new SockJS('http://localhost:8080/ws-stomp');
//     stompClient = Stomp.over(socket);
//     stompClient.connect({}, onConnected, onError);
// }
//
// function onConnected() {
//     console.log("onConnected");
//     stompClient.subscribe('/sub/chat/room/' + roomId, onMessageReceived);
//     stompClient.send("/pub/chat/enterUser",
//         {},
//         JSON.stringify({"roomId": roomId, sender: username, type: 'ENTER'})
//     )
// }
//
// function sendMessage(event) {
//     var messageContent = messageInput.value.trim();
//     if(messageContent && stompClient) {
//         var chatMessage = {
//             "roomId": roomId,
//             sender: username,
//             content: messageInput.value,
//             type: 'TALK'
//         };
//         stompClient.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
//         messageInput.value = '';
//     }
// }


// let sock = new SockJS('http://localhost:8080/ws-stomp');
// sock.onopen = function () {
//     console.log('open');
//     sock.send('test');
// }
//
// sock.onmessage = function (e) {
//     console.log('message', e.data);
//     sock.close();
// }
//
// sock.onclose = function() {
//     console.log('close');
// }
//
//
export default Chat;