import {useEffect, useState, useRef, useLayoutEffect} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from 'react-bootstrap';

import styled from 'styled-components'
import SockJs from 'sockjs-client';
import {useSelector} from "react-redux";
import '../css/chat.css';
import Canvas from "./Canvas";
import { fabric } from "fabric";
var Stomp = require('stompjs/lib/stomp.js').Stomp;


let ChatInput = styled(InputGroup)`
    //position: fixed;
    bottom: 0;
`
var stompClient = null;
function Chat({chat}) {
    let [contents, setContents] = useState([]);
    let [messageInput, setMessageInput] = useState("");

    let user = useSelector(state => state.user);


    useEffect(() => {
        console.log("Message ServerStart")
        var sock = new SockJs('/ws-stomp');
        console.log("new sockjs");
        console.log(sock);
        stompClient = Stomp.over(sock);
        console.log("new stompClient");
        console.log(stompClient);

        stompClient.connect({}, () => {
            stompClient.subscribe('/sub/chat/room/' + chat.roomId, onMessageReceived)
        });

        console.log(stompClient.connected);
        if(stompClient.connected) {
            console.log("stompClient connected!!!");
            stompClient.send("/pub/chat/enterUser", {},
                JSON.stringify({
                    roomId: chat.roomId,
                    sender: user.nickName,
                    type: 'ENTER'
                })
            )
        }
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
        console.log("메세지 전송!!!!")
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
        setMessageInput("");
    }


    // convas

    const fabricRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const initFabric = () => {
            fabricRef.current = new fabric.Canvas(canvasRef.current,{
                width:1680,
                height:500,
                backgroundColor:"white",

                // enableToolbar:true,
                // showToolbar:true,
                // brushColor:'blue'
            });
        };

        const addRectangle = () => {
            const rect = new fabric.Rect({
                top: 50,
                left: 50,
                width: 50,
                height: 50,
                fill: "red"
            });

            fabricRef.current.add(rect);
        };

        const disposeFabric = () => {
            fabricRef.current.dispose();
        };

        initFabric();
        addRectangle();

        return () => {
            disposeFabric();
        };
    }, []);

    return (
        <Container style={{height:'100%'}}>
            <Row>
                <Col xs={4} className='mt-5 div-shadow'>
                    <div>
                        <h4>Chatting Room : {chat.roomName}</h4>
                        <div style={{height:'70vh', overflowY:'auto'}}>
                            {
                                contents.map((message) => <Message message={message}/>)
                            }
                        </div>
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
                                    placeholder="메세지를 입력하세요"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={messageInput}
                                />
                                <Button onClick={() =>
                                    sendMessage()
                                } variant="outline-secondary" id="button-addon2">
                                    전송
                                </Button>
                            </InputGroup>
                        </ChatInput>
                    </div>
                </Col>
                <Col xs={8} className='mt-5'>
                    <div style={{height:'40%',display:'flex'}} className="div-shadow">

                    </div>
                    <div style={{height:'60%',overflow:'auto'}} className="div-shadow">
                        {/*<Canvas/>*/}
                        <canvas ref={canvasRef}  width={400} height={400}></canvas>
                    </div>
                </Col>
            </Row>
        </Container>
    )

    //canvas

}

function Message({message}) {
    return (
        <div className="mine messages">
            <div className="message last">
                {message.message}
            </div>
        </div>

    )
}

export default Chat;