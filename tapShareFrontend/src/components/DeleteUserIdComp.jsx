import { useEffect, useRef, useState } from "react";
import Flame from '../assets/giphy.gif'
import FireSound from '../assets/fire.mp3'
import { Tooltip } from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useStore } from "../utility/store";

const DeleteUserIdComp = () => {
    const fireButton = useStore((state) => state.fireButton);
    const [isPressed, setIsPressed] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const audioRef = useRef(null);
    const timeoutIdRef = useRef(null);
    const [showButton, setShowButton] = useState(false)
    // console.log("show button", showButton)
    // console.log("fire button", fireButton)




    const handlePointerDown = () => {
        setIsPressed(true);
        timeoutIdRef.current = setTimeout(() => {
            localStorage.removeItem("userId");
            const userId = localStorage.getItem("userId");
            if (!userId) {
                setShowToast(true);
                playFireSound();
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            }
        }, 2000);
    };

    const handlePointerUp = () => {
        setIsPressed(false);
        clearTimeout(timeoutIdRef.current);
        const userId = localStorage.getItem("userId");
        if (userId) {
            setShowButton(true)
        }
    };


    const playFireSound = () => {
        if (audioRef.current) {
            setIsPressed(false);
            audioRef.current.play();
        }
    };
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setShowButton(true)
        } else {
            setTimeout(() => {
                setShowButton(false)
            }, 3500);
        }
    }, [isPressed, fireButton])

    useEffect(() => {
        audioRef.current = new Audio(FireSound);

        return () => {
            clearTimeout(timeoutIdRef.current);
            setShowToast(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);
    return (
        <>
            {
                showButton &&
                <>
                    <div
                        className={` ${showToast ? "-translate-x-4 sm:-translate-x-8 visible" : "invisible translate-x-full"
                            } rounded z-50  cursor-pointer duration-300 fixed top-4 right-4 py-2 px-4  bg-blue-600 text-slate-100`}
                    >
                        User Id is Deleted !!!
                    </div>

                    <div
                        className={`${showToast ? "visible" : "invisible"} absolute   bottom-12 z-40 -right-[21.8rem] sm:-right-[19.7rem]`}
                    >
                        <img
                            src={Flame}
                            style={{ WebkitUserDrag: "none" }}
                            className="h-[30%] w-[30%] select-none user"
                        />
                    </div>

                    <div
                        style={{ WebkitUserDrag: "none" }}
                        className="absolute appearance-none outline-none select-none  bottom-10 z-40 right-8 sm:right-16"
                    >
                        <div
                            style={{ WebkitUserDrag: "none" }}
                            onPointerDown={handlePointerDown}
                            onPointerUp={handlePointerUp}
                            className={`${showToast ? "bg-red-400/70" : "active:bg-slate-500/60 bg-slate-500"
                                } ${isPressed ? "animate" : "animate-none"} duration-300 select-none hover:scale-110  cursor-pointer after:animate-ping rounded-full  p-4`}
                        >
                            <LocalFireDepartmentIcon style={{ WebkitUserDrag: "none" }} className="select-none text-red-400 z-50 " />
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default DeleteUserIdComp;
