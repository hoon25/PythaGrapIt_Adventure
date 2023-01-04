package chat.springSocket.chat;


import chat.springSocket.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ChatRoom {
    private String roomId;
    private String roomName;
    private long userCount;

    public enum  ChatType {
        MSG, RTC, BOTH,
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

    @Builder
    public ChatRoom(String roomId, String roomName, long userCount, ChatType chatType, HashMap<String, UserEntity> userList, HashMap<String, WebSocketSession> videoList) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.userCount = userCount;
        this.chatType = chatType;
        this.userList = userList;
        this.videoList = videoList;
    }
}
