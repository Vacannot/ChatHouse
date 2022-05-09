import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from '../../../server/types';
import SocketContext from "./SocketContext";

interface Props {
    children: React.ReactNode
  };

// Skapar en provider för kontexten
const SocketProvider: React.FC<Props> = ({children}) => {
    const navigate = useNavigate();
    const [socket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(io("http://localhost:3001", {
        autoConnect: false
    }));
    const [rooms, setRooms] = useState<string[]>([]);
    const [name, setUser] = useState<string>('');
    const [room, setRoom] = useState<string>('');

    useEffect(() => {
        const listener = (name: string) => {
            console.log(`Connected User: ${name}`);
            setUser(name);
            navigate('/rooms');
        };


        socket.on("connected", listener);
        return () => { socket.off('connected', listener); };
    }, [navigate, socket]);
    
    //Listar alla rum
    useEffect(() => {
        socket.on("roomList", (availableRooms) => {
            console.log(availableRooms);
            setRooms(availableRooms);
        })
    });

    useEffect(() => {
        socket.on("joined", (room) => {
            console.log(`Users RoomName: ${room}`);
            setRoom(room);
        })
      });

      useEffect(() => {
        socket.on("connect_error", (err) => {
            if (err.message === "Invalid username") {
                console.log("Invalid username, please try again.");
            }
        });
      });

    return (
        <SocketContext.Provider value={{
            socket,
            rooms,
            username: name,
            roomName: room,
        }
        }>
        {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);