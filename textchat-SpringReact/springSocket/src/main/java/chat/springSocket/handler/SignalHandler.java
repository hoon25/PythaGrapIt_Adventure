package chat.springSocket.handler;

import chat.springSocket.chat.ChatRoom;
import chat.springSocket.chat.ChatService;
import chat.springSocket.chat.WebRTCMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SignalHandler extends TextWebSocketHandler {

    private final ChatService chatService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String MSG_TYPE_OFFER = "offer";
    private static final String MSG_TYPE_ANSWER = "answer";
    private static final String MSG_TYPE_ICE = "ice";
    private static final String MSG_TYPE_JOIN = "join";
    private static final String MSG_TYPE_LEAVE = "leave";

    private List<ChatRoom> rooms;

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        logger.info("[ws] Session has been closed with status [{} {}]", status, session);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        rooms = chatService.findAllRoom();
        sendMessage(session, new WebRTCMessage("Server", MSG_TYPE_JOIN, Boolean.toString(!rooms.isEmpty()), null, null));
    }


    private void sendMessage(WebSocketSession session, WebRTCMessage webRTCMessage) {
        try {
            String json = objectMapper.writeValueAsString(webRTCMessage);
            session.sendMessage(new TextMessage(json));
        } catch (IOException e) {
            logger.debug("An error occured: {}", e.getMessage());
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage){
        try {

            WebRTCMessage webRTCMessage = objectMapper.readValue(textMessage.getPayload(),WebRTCMessage.class);
            logger.debug("[ws] Message of {} type from {} received", webRTCMessage.getType(), webRTCMessage.getSender());

            String userUUID = webRTCMessage.getSender();
            String roomId = webRTCMessage.getData();

            ChatRoom room;

            switch (webRTCMessage.getType()){

                case MSG_TYPE_OFFER:
                case MSG_TYPE_ANSWER:
                case MSG_TYPE_ICE:
                    Object candidate = webRTCMessage.getCandidate();
                    Object sdp = webRTCMessage.getSdp();

                    logger.debug("[ws] Signal: {}",
                            candidate != null
                                    ? candidate.toString().substring(0, 64)
                                    : sdp.toString().substring(0, 64));

                    ChatRoom roomDto = chatService.findRoomById(roomId);

                    if(roomDto != null){
                        Map<String, WebSocketSession> clients = roomDto.getVideoList();

                        for (Map.Entry<String, WebSocketSession> client : clients.entrySet()) {
                            if(!client.getKey().equals(userUUID)){
                                sendMessage(client.getValue(),
                                        new WebRTCMessage(
                                                userUUID,
                                                webRTCMessage.getType(),
                                                roomId,
                                                candidate,
                                                sdp
                                        ));
                            }
                        }
                    }
                    break;
                case MSG_TYPE_JOIN:
                    logger.debug("[ws] {} has joined Room: #{}", userUUID, webRTCMessage.getData());
                    rooms = chatService.findAllRoom();
                    room = chatService.findRoomById(roomId);

                    chatService.addClient(room, userUUID, session);
                    rooms.add(room);
                    break;
                case MSG_TYPE_LEAVE:
                    logger.info("[ws] {} is going to leave Room: #{}", userUUID, webRTCMessage.getData());
                    room = chatService.findRoomById(webRTCMessage.getData());
                    Optional<String> client = chatService.getClients(room).keySet().stream()
                            .filter(clientListKeys -> clientListKeys.equals(userUUID))
                            .findAny();
                    client.ifPresent(userId -> chatService.removeClientByName(room, userId));
                    logger.debug("삭제완료 [{}]", client);
                    break;
                default:
                    logger.debug("[ws] Type of the received message {} is undefined!", webRTCMessage.getType());
            }

        }catch (IOException e){
            logger.debug("An error ocuured: {}",e.getMessage());
        }
    }

}
