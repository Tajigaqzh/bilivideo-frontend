


export default function useWebSocket(roomId: string, userId: number, socketResult: any) {
    const socket = new WebSocket(`ws://localhost:8899/chat/${roomId}/${userId}`);

    // {"type":"room","data":"546456","senderName":"123456","senderId":1}

    socket.onmessage = (e: MessageEvent<any>) => {
        const res = JSON.parse(e.data);
        socketResult.data = res.data ?? ""
        socketResult.type = res.type ?? "";
        socketResult.senderName = res.senderName ?? "";
        socketResult.senderId = res.senderId ?? "";
        socketResult.id = res.id ?? "";
    }

    function send(message: string) {
        socket.send(message);
    }

    function close() {
        socket.close();

    }

    return {
        send, close
    }
}