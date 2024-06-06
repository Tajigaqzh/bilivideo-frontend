import {useUserStoreHook} from "@/store/userStore.ts";
import {ElMessage} from "element-plus";
// import {IWsFormat, WsMsgTypeEnum} from "../../types/websocket";

// const userStore = useUserStoreHook();


export interface SocketMessage {
    // 系统，用户，通知，房主
    type: 'system' | 'user' | 'notice' | 'room';
    data: any;
    to?: string;
    senderName?: string;
    senderId: string;
}

export class WebSocketClass {
    socket: WebSocket | null = null;
    userId?: string;
    roomId: string;
    username: string;

    constructor(username: string, roomId: string) {
        this.username = username;
        this.roomId = roomId;

        this.socket = new WebSocket(`ws://localhost:8899/chat/${this.roomId}?userName=${username}`);
    }


    send(message: SocketMessage) {
        if (this.socket) {
            try {
                this.socket.send(JSON.stringify(message));
            } catch (e) {
                ElMessage.error('发送失败');
            }
        } else {
            ElMessage.error('未建立连接');
        }
    }


    close() {
        this.socket && this.socket.close();
    }


    onMessage(callback: (message: SocketMessage) => void) {
        if (this.socket) {
            this.socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                callback(message);
            };
        }

    }
}

// const socket = new WebSocketClass(userStore.username, "111");

// export const socketRef = ref(socket);