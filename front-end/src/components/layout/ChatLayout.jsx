/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from 'axios';

import Welcome from "./Welcome";
import ShowInbox from "./ShowInbox";
import ChatRoom from './ChatRoom';

export default function ChatLayout() {
    const [users, SetUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);

    const [currentChatRoom, setCurrentChatRoom] = useState();

    const [chatrooms, setChatrooms] = useState([]);
    const baseUrl = "http://localhost:8080/api"

    useEffect(() => {
        const fetchUserChatrooms = async () => {
            try {
                const response = await axios.get(`${baseUrl}/chatrooms`);
                // console.log("ok")
                setChatrooms(response.data.chatrooms);
            } catch (error) {
                console.error('Error fetching user chatrooms:', error);
            }
        };
        
        fetchUserChatrooms();
    }, []);    

    const handleChatChange = (chat) => {
        setCurrentChatRoom(chat);
    };

    return (
        <div className="container mx-auto">
            <div className="min-w-full bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
                <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">

                    <ShowInbox
                        chatrooms={chatrooms}
                        changeChat={handleChatChange}
                    />
                </div>

                {currentChatRoom ? (
                    <ChatRoom 
                        currentChatRoom={currentChatRoom}
                    />
                ) : (
                    <Welcome />
                )}
            </div>
        </div>
    );
}
