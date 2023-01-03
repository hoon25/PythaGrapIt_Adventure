package chat.springSocket.chat;

import chat.springSocket.user.MemoryUserRepository;
import chat.springSocket.user.UserEntity;
import chat.springSocket.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.util.*;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MemoryChatRepository implements ChatRepository {

    private final UserRepository userRepository;

    private Map<String, ChatRoom> chatRoomMap;

    @PostConstruct
    private void init() {
        chatRoomMap = new HashMap<>();
        ChatRoom testChatRoom1 = new ChatRoom().create("테스트 문자 채팅 방", ChatRoom.ChatType.MSG);
        ChatRoom testChatRoom2 = new ChatRoom().create("테스트 문자 채팅 방2", ChatRoom.ChatType.MSG);
        ChatRoom testChatRoom3 = new ChatRoom().create("테스트 영상 채팅 방", ChatRoom.ChatType.RTC);
        ChatRoom testChatRoom4 = new ChatRoom().create("테스트 영상 채팅 방2", ChatRoom.ChatType.RTC);

        chatRoomMap.put(testChatRoom1.getRoomId(), testChatRoom1);
        chatRoomMap.put(testChatRoom2.getRoomId(), testChatRoom2);
        chatRoomMap.put(testChatRoom3.getRoomId(), testChatRoom3);
        chatRoomMap.put(testChatRoom4.getRoomId(), testChatRoom4);
    }

    @Override
    public List<ChatRoom> findAllRoom() {
        ArrayList<ChatRoom> chatRooms = new ArrayList<ChatRoom>(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }

    @Override
    public ChatRoom findRoomById(String roomId) {
        return chatRoomMap.get(roomId);
    }

    @Override
    public ChatRoom createRoom(String roomName, ChatRoom.ChatType chatType) {
        ChatRoom chatRoom = new ChatRoom().create(roomName, chatType);
        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

    @Override
    public void removeRoom(String roomId) {
        chatRoomMap.remove(roomId);
    }

    @Override
    public void addRoomUser(String roomId, Long userId) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        chatRoomMap.get(roomId).getUserList().put(userEntity.getNickName(), userEntity);
    }

    @Override
    public void delRoomUser(String roomId, Long userId) {
        chatRoomMap.get(roomId).getUserList().remove(userRepository.findByUserId(userId).getNickName());
    }

    @Override
    public Map<String, WebSocketSession> addClient(ChatRoom room, String name, WebSocketSession session) {
        Map<String, WebSocketSession> userList = room.getVideoList();
        userList.put(name, session);
        return userList;
    }

    @Override
    public Map<String, WebSocketSession> getClients(ChatRoom room) {
        Optional<ChatRoom> roomDto = Optional.ofNullable(room);

        return roomDto.<Map<String, WebSocketSession>>map(ChatRoom::getVideoList).orElse(null);
    }

    @Override
    public void removeClientByName(ChatRoom room, String userUUID) {
        room.getVideoList().remove(userUUID);
    }
}

