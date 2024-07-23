import React from "react";
import { createContext } from "react";
import { useMemo } from "react";
import { io } from "socket.io-client"
import { useContext } from "react";

const SocketContext = createContext(null)

function SocketUse(){
    return useContext(SocketContext);
}

function SocketProvider(props){
    const socket = useMemo(() => 
        io("http://localhost:8001")
        ,[]
    )
    return (<SocketContext.Provider value={{socket}}>
        {props.children}
    </SocketContext.Provider>)
}

export { SocketUse, SocketProvider }