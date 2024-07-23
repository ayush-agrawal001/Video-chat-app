import React, { useCallback, useEffect, useState } from "react";
import { SocketUse } from "../providers/SocketCon";
import { PeerUse } from "../providers/Peer";
import ReactPlayer from "react-player";

function RoomPage(){
    const { socket } = SocketUse();
    const { creatingOffer, peer, creatingAnswer , setAnsRemote, sendStream, remoteStream} = PeerUse(); 

    const [myStream, setMyStream] = useState(null);
    const [remoteEmailId , setRemoteEmailId] = useState(null)

    const getStreamMedia = useCallback(async () =>{
        const stream = await navigator.mediaDevices.getUserMedia({ audio : true, video : true })
        setMyStream(stream)
    })

    //caller side of code
    const handleNewJoined =  useCallback(async (data) => {
        const {emailId} = data; //email id of the user joined
        console.log("Email joined", emailId )
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer) // this is my sdp sending it to the other member
        socket.emit("call-user", {emailId, offer}) 
        // making a call to this emailid with offer(sdp) then using it to make a 
        // connection between the users.          
        setRemoteEmailId(emailId) 
        // i set the remote email id because, to show it to the other side who you are connectd with 
    })
    
    //callee side of code
    const handleIncomingCall = useCallback(async (data) => {
        const { from, offer } = data
        console.log("incoming call from" , from, offer);
        const ans = await creatingAnswer(offer)
        socket.emit("call-answered", { emailId : from , ans})
        setRemoteEmailId(from)
    })

    //caller side of code
    const handleAnsweredCall = useCallback (async (data) => {
        const {ans} = data;
        await setAnsRemote(ans)
        console.log( "call got accepted");
    })

    // to resolve the negotiation needed error
    const handleNegotiation =  useCallback (async() => {
        const localDescription = await peer.createOffer();
        await peer.setLocalDescription(localDescription)
        socket.emit("call-user", {emailId : remoteEmailId, offer : localDescription})
    })

    useEffect( () => {
        getStreamMedia()
    }, [getStreamMedia])

    useEffect( () => {
        socket.on("user-joined", handleNewJoined);
        socket.on("incoming-call", handleIncomingCall)
        socket.on("call-answered" , handleAnsweredCall)
        return () => {
            socket.off("user-joined", handleNewJoined);
            socket.off("incoming-call", handleIncomingCall)
            socket.off("call-answered" , handleAnsweredCall)
        }
    }, [])
    
    useEffect(() => {
        peer.addEventListener("negotiationneeded", handleNegotiation)
        return () => {peer.removeEventListener("negotiationneeded", handleNegotiation)} 
    })
    let text = "No-one"
    return (
        <div className="videoRoom">
        <h1>Video Chat</h1>
        <h2>You are connected with {remoteEmailId === null ? text : remoteEmailId}</h2>
        <button onClick={(e) => sendStream(myStream)}>Send My Video</button>
        <ReactPlayer url={myStream} playing muted/>
        <ReactPlayer url={remoteStream} playing />
        </div>
    )

}

export default RoomPage;