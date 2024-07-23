import React, { useCallback, useEffect, useState } from "react";
import { SocketUse } from "../providers/SocketCon";
import { useNavigate } from "react-router-dom";

function HomePage(){
    const { socket } = SocketUse();
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const handleJoin = useCallback(() => {
        socket.emit("join-room", { roomId : room, emailId : email })
    })

    const handleRoomJoined = useCallback(( { roomId } ) => {
        // console.log(`room joined ${roomId}`)
        navigate(`/room/${roomId}`)
    })

    useEffect(() => {
        socket.on("joined-room", handleRoomJoined)
        return (
            () => {socket.off("joined-room", handleRoomJoined)}
        )
    }, [socket])

    return(
        <div id="homepage">
        <div id="input-container">
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your Email id" ></input>
            <input type="Number" value={room} onChange={e => setRoom(e.target.value)} placeholder="Enter your Room id"></input>
            <button type="submit" onClick={handleJoin}>Enter Meeting</button>
        </div>
        </div>
    )
}

export default HomePage;