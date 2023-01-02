package chat.springSocket.chat;

import chat.springSocket.user.MemoryUserRepository;
import chat.springSocket.user.UserEntity;
import chat.springSocket.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

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
        ChatRoom testChatRoom1 = new ChatRoom().create("테스트 채팅 방");
        ChatRoom testChatRoom2 = new ChatRoom().create("테스트 채팅 방2");
        chatRoomMap.put(testChatRoom1.getRoomId(), testChatRoom1);
        chatRoomMap.put(testChatRoom2.getRoomId(), testChatRoom2);
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
    public ChatRoom createRoom(String roomName) {
        ChatRoom chatRoom = new ChatRoom().create(roomName);
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
}

