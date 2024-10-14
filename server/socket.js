import Message from "./models/MessagesModel.js";
import {Server as SockerIOServer} from "socket.io"

const setupSocket = (server) => {
   const io = new SockerIOServer(server,{
    cors:{
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"],
        credentials:true,
    }
   })

   const userSocketMap = new Map(); 
    
    const disconnect = (socket) =>{
        console.log(`client disconnected; ${socket.id}`)
        for(const [userId,socketId] of userSocketMap.entries()){
            if(socketId === socket.id){
                userSocketMap.delete(userId)
                break;
            }
        }
    }


    const sendMessage = async (message) =>{
       const senderSocketId = userSocketMap.get(message.sender);
       const recipientSocketId = userSocketMap.get(message.recipient);

       const createdMessage = await Message.create(message)

       const messageData = await Message.findById(createdMessage._id).populate("sender","id email firstName LastName image color").populate("recipient","id email firstName LastName image color")

       if(recipientSocketId){
        io.to(recipientSocketId).emit("reciveMessage", messageData)
       }

       if(senderSocketId){
        io.to(senderSocketId).emit("reciveMessage", messageData)
       }

    }

    io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;

    if(userId){
       userSocketMap.set(userId,socket.id);
       console.log(`user connected ${userId} with socked ID: ${socket.id}`)
    }else{
        console.log("user id not provided during connection.")
    }

    socket.on("sendMessage",sendMessage)
    socket.on("disconnect", ()=>disconnect(socket))

   })
}

export default setupSocket