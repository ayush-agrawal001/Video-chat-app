import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import { Server } from 'socket.io';


const io = new Server(
    {cors : true}
)

const app = express();

app.use(bodyParser.json())

const emailToSocketMapping = new Map(); 
const socketidToEmailMap = new Map(); 

io.on('connection', socket => {
    console.log("New Connection")
    
    socket.on("join-room" , (data) => {
        const { roomId , emailId} = data;
        console.log(`${emailId} joined in ${roomId}`)
        emailToSocketMapping.set(emailId, socket.id)
        socketidToEmailMap.set(socket.id, emailId)
        socket.join(roomId);
        socket.emit("joined-room",{ roomId })
        socket.broadcast.to(roomId).emit("user-joined", {emailId})
        // This is important we are emiting the email id to 
        // all the person except the person who sent it in that room
    })

    socket.on("call-user", (data) => {
        const { emailId, offer } = data
        const socketId = emailToSocketMapping.get(emailId ) // This is the socketID to make a call to
        const fromEmail = socketidToEmailMap.get(socket.id) // this is the email from we make call 
        socket.to(socketId).emit("incoming-call", {from : fromEmail, offer})
        
    })
    
    socket.on("call-answered", (data) => {
        const { emailId, ans } = data
        const socketId = emailToSocketMapping.get(emailId)
        socket.to(socketId).emit("call-answered", { ans })
    } )
})

app.listen(8000, () => {console.log("HTTP server running at port 8000");})
// http(express) server will start the server 
io.listen(8001, () => {console.log("Socket server is running at port 8001");})
// socket.io or websocket will help me in making the connection