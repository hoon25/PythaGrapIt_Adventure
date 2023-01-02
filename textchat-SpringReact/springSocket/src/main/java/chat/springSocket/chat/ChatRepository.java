package chat.springSocket.chat;

import chat.springSocket.user.UserEntity;

import java.util.List;

public interface ChatRepository {

    List<ChatRoom> findAllRoom();

    ChatRoom findRoomById(String roomId);

    ChatRoom createRoom(String roomName);

    void removeRoom(String roomId);

    void addRoomUser (String roomId, Long userId);

    void delRoomUser (String roomId, Long userId);

}
