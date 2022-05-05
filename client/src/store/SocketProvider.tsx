import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../../server/types";

import SocketContext, {SocketContextType} from "./SocketContext";

const defaultSocketState: SocketContextType = {
    socket: undefined,
    rooms: [],
    username: '',
    roomName: '',
}

interface Props {
    children: React.ReactNode
  };

// Skapar en provider för kontexten
const SocketProvider: React.FC<Props> = ({children}) => {

    // state
    // rummen, nickname, valt rum, aktuela chatten


    return (
        <SocketContext.Provider value={{
            socket: io({
                autoConnect: false
            }),
            rooms: [],
            username: '',
            roomName: '',
        }
        }>
        {children}
        </SocketContext.Provider>
    )
}

// useEffect(() => {
    
//     return (
//        <socketContext.Provider 
//        value = {{
//            socket,
//            rooms,
//            updateShorthandPropertyAssignment,
//            roomName,
//        }}
//        >
//          { children }
//           </socketContext.Provider>
//         );
//     };
    
     



export default SocketContext;