package chat.springSocket.chat;


import chat.springSocket.user.UserEntity;
import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.UUID;

@Data
public class ChatRoom {
    private String roomId;
    private String roomName;
    private long userCount;

    public enum  ChatType {
        MSG, RTC
    }
    private ChatType chatType;

    private HashMap<String, UserEntity> userList = new HashMap<>();
    private HashMap<String, WebSocketSession> videoList = new HashMap<>();

    public ChatRoom create(String roomName, ChatType chatType) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.roomName = roomName;
        chatRoom.chatType = chatType;
        return chatRoom;
    }

}
