import { LogoutIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logout from "../user/Logout";
import Theme from './Theme';

export default function NavBar() {
    const [modal, setModal] = useState();
    const token = localStorage.getItem("token")

    return (
        <>
            <nav className="px- px-2 sm:px-4 py-2.5 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <Link to="/" className="flex">
                        <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                            Chat App
                        </span>
                    </Link>
                    <div className="flex md:order-2">
                        <Theme />

                        {token && (
                            <>
                                <button
                                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                                    onClick={() => setModal(true)}
                                >
                                    <LogoutIcon className="h-8 w-8" aria-hidden="true" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {modal && <Logout modal={modal} setModal={setModal} />}
        </>
    );
}
