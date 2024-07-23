import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home"
import RoomPage from "./pages/Room";

import { SocketProvider } from "./providers/SocketCon";
import { PeerProvider } from "./providers/Peer";

function App(){
  return(
    <div>

    <SocketProvider>
      <PeerProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
      </PeerProvider>
    </SocketProvider>
    
    </div>
  )
}

export default App;