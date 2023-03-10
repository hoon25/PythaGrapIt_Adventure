package chat.springSocket.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    public List<ChatRoom> findAllRoom() {
        List<ChatRoom> chatRoom = chatRepository.findAllRoom();
        return chatRoom;
//        return chatRoom.stream().filter(room -> room.getChatType() == chatType).collect(Collectors.toList());
    }

    public ChatRoom findRoomById(String roomId) {

        return chatRepository.findRoomById(roomId);
    }

    public void createRoom(String roomName, ChatRoom.ChatType chatType) {
        chatRepository.createRoom(roomName, chatType);
    }

    public void removeRoom(String roomId) {
        chatRepository.removeRoom(roomId);
    }

    public void addRoomUser(String roomId, Long userId) {
        chatRepository.addRoomUser(roomId, userId);
    }

    public void delRoomUser(String roomId, Long userId) {
        chatRepository.delRoomUser(roomId, userId);
    }


}
