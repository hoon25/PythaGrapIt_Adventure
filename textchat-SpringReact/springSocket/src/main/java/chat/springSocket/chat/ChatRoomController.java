package chat.springSocket.chat;


import chat.springSocket.user.UserEntity;
import chat.springSocket.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Random;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatService chatService;
    private final UserService userService;

    /*
    채팅방 전체 목록
     */
    @GetMapping("/chat")
    public ResponseEntity<List<ChatRoom>> chat() {
        log.info("chat room list");
        return ResponseEntity.ok().body(chatService.findAllRoom());
    }

    /*
     * 채팅방 생성
     */
    @PostMapping("/chat/room")
    public ResponseEntity<ChatRoom> createRoom(@RequestBody ChatRoom chatRoom, HttpSession session) {
        log.info(chatRoom.getRoomName());
        //TODO 채팅방 이름 자동 생성
        if(session.getAttribute("user")==null){
            Random rand = new Random();
            int randomInt = rand.nextInt(10 - 1 + 1) + 1;
            chatService.createRoom("guest"+randomInt+"님의 채팅방");
        }
        else{
            UserEntity userEntity = (UserEntity) session.getAttribute("user");
            chatService.createRoom(userEntity.getNickName() + "님의 채팅방");
        }
        return ResponseEntity.ok().build();
    }

    /*
     * 채팅방 입장
     */
    @GetMapping("/chat/room/{roomId}")
    public ResponseEntity<ChatRoom> enterRoom(@PathVariable("roomId") String roomId) {
        log.info("enterRoom");
        return ResponseEntity.ok().body(chatService.findRoomById(roomId));
    }






}
