/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Message from './Message';
import ChatForm from './ChatForm';

export default function ChatRoom({ currentChatRoom }) {
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const baseUrl = "http://localhost:8080/api"

    const scrollRef = useRef();

    useEffect(() => {
        const fetchChatroomMessages = async () => {
            try {
                const response = await axios.get(`${baseUrl}/chatrooms/${currentChatRoom.id}`);
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching chatroom messages:', error);
            }
        };

        fetchChatroomMessages();
    }, [currentChatRoom.id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const handleFormSubmit = async (message) => {
        const senderId = currentChatRoom.user.id
        const receiverId = currentChatRoom.assistant.id
        const sender = "user"

        const header = {
            "Content-Type": "application/json"
        }
        const body = {
            'chat_room_id': currentChatRoom.id,
            'user_id': senderId,
            'assistant_id': receiverId,
            'message': message,
            'sender': sender

        }

        try {
            const response = await axios.post(`${baseUrl}/message`, body, header)
            setMessages([...messages, response.data.message]);

        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <div className="lg:col-span-2 lg:block">
            <div className="w-full">
                <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <div className="relative flex items-center">
                        <img className="w-10 h-10 rounded-full" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="" />
                        <span className="block ml-2 text-gray-500 dark:text-gray-400">
                            {currentChatRoom.assistant.name}
                        </span>

                    </div>
                </div>

                <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <ul className="space-y-2">
                        {messages?.map((message, index) => (
                            <div key={index} ref={scrollRef}>
                                <Message message={message} self={currentChatRoom.user.id} />
                            </div>
                        ))}
                    </ul>
                </div>

                <ChatForm handleFormSubmit={handleFormSubmit} />
            </div>
        </div>
    );
}
