/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ShowInbox({
    chatrooms,
    changeChat,
}) {
    const [selectedChat, setSelectedChat] = useState();

    const changeCurrentChat = (index, chat) => {
        setSelectedChat(index);
        changeChat(chat);
    };


    return (
        <>
            <ul className="overflow-auto h-[30rem]">
                <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Inbox</h2>
                <li>
                    { chatrooms ? 
                    (chatrooms.map((chatroom, index) => (
                        <div
                            key={index}
                            className={classNames(
                                index === selectedChat
                                    ? "bg-gray-100 dark:bg-gray-700"
                                    : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                                "flex items-center px-3 py-2 text-sm "
                            )}
                            onClick={() => changeCurrentChat(index, chatroom)} >
                            
                            <div className="relative flex items-center">
                                <img className="w-10 h-10 rounded-full" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="" />
                                <span className="block ml-2 text-gray-500 dark:text-gray-400">
                                    { chatroom.assistant.name }
                                </span>
                            
                            </div>
                        </div>
                    )))
                    : 
                    (<div>
                        <h2 className="text-gray-900 dark:text-white">tidak ada chat</h2>
                    </div>) }
                </li>
            </ul>
        </>
    );
}
