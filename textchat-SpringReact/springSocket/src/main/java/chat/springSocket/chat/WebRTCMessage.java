package chat.springSocket.chat;

import lombok.Builder;
import lombok.Data;

@Data
public class WebRTCMessage {
    private String sender;
    private String type;
    private String data;
    private Object candidate;
    private Object sdp;

    @Builder
    public WebRTCMessage(String sender, String type, String data, Object candidate, Object sdp) {
        this.sender = sender;
        this.type = type;
        this.data = data;
        this.candidate = candidate;
        this.sdp = sdp;
    }
}
