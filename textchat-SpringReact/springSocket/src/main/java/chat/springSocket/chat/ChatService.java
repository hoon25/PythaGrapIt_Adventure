package chat.springSocket.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    public List<ChatRoom> findAllRoom() {
        return chatRepository.findAllRoom();
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRepository.findRoomById(roomId);
    }

    public void createRoom(String roomName) {
        chatRepository.createRoom(roomName);
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
