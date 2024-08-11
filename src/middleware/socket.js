import {Server } from "socket.io";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";
import {sendMessage} from "../models/chat.dao.js";

export const socketServer = (server) =>{
    const io = new Server (server, {path: '/chat',
        cors: {
            credentials:true,
            origin: '*', // CORS 설정 (모든 출처 허용)
            methods: ['GET', 'POST']
        },
        allowEIO3:true, // Legacy Engine.IO 버전 호환성
    }); // 클라리언트 접속 경로
    io.on('connection',(socket) =>{
        // 연결
        const req = socket.request;
        const ip = req.headers['x-forward-for'] || req.connection.remoteAddress;
        console.log("새로운 클라이언트 접속:", ip , socket.id, req.ip);

        // 연결 해제
        socket.on('disconnect', () =>{
            console.log("클라이언트 접속 해제")
            clearInterval(socket.interval);
        })

        socket.on('error', (error)=>{
            console.error(error);
            throw new BaseError(status.CONNECT_IS_WRONG);
        })

        //  custom Event
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
            // 방에 성공적으로 참가했다는 확인 메시지 전송
            socket.emit('joinRoomConfirmation', `You have joined room ${roomId}`);
        });

        socket.on('sendMessage', async ({ roomId, userId, message }) => {
            try {
                const messageId = await sendMessage(roomId, userId, message);
                const newMessage = {
                    id: messageId,
                    roomId,
                    userId,
                    message,
                    timestamp: new Date(),
                    read: false
                };
                // 해당 방에 참가한 모든 클라이언트에게 메시지를 브로드캐스트
                io.to(roomId).emit('receiveMessage', newMessage);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        // TEST
        // 다른 사용자가 보낸 메시지를 수신하는 부분


    })
}