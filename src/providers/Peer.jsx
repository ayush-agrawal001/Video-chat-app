import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const PeerContext = createContext(null);

function PeerUse(){
    return useContext(PeerContext)
}


function PeerProvider(props){

    const [remoteStream, setRemoteStream] = useState(null);

    const peer = useMemo(
        () => new RTCPeerConnection(
            {
                iceServers: [
                    {
                        urls: [
                            'stun:stun1.l.google.com:19302',
                            'stun:stun2.l.google.com:19302',
                        ],
                    },
                ],
                iceCandidatePoolSize: 10,
            }
        ), []
    )
    
    const sendStream = useCallback(async (stream) => {
        const tracks = stream.getTracks();
        for (const track of tracks){
            peer.addTrack(track, stream)
        }
    })

    const creatingOffer = useCallback(async () => {
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer); //to make my computer know its own ip
        return offer
    })
    
    const creatingAnswer = useCallback(async (offer) => { 
        await peer.setRemoteDescription(offer) // setting the offer as a remote description
        const answer = await peer.createAnswer(); // making an answer for the offer 
        await peer.setLocalDescription(answer); // setting the answer as a local description to whom we called to 
        return answer
    })
    
    const handleEventListener = useCallback(async (ev) => {
        const streams = ev.streams
        setRemoteStream(streams[0])
    })

    useEffect( () => {
        peer.addEventListener("track", handleEventListener)

        return (() => {
            peer.removeEventListener("track", handleEventListener)
        })
    } )

    const setAnsRemote = useCallback(async (ans) => {
        await peer.setRemoteDescription(ans) 
    })

    return(
        <PeerContext.Provider value={ {peer, creatingOffer, creatingAnswer, setAnsRemote, sendStream, remoteStream } }>
            {props.children}
        </PeerContext.Provider>
    )
}

export {PeerProvider, PeerUse}