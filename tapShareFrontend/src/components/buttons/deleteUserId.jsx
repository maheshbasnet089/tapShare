import { useEffect, useRef, useState } from "react";
import FireSound from "../../assets/fire.mp3";
import { MdLocalFireDepartment } from "react-icons/md";
import { useStore } from "../../utility/store";

const DeleteUserId = () => {
  const fireButton = useStore((state) => state.fireButton);
  const [isPressed, setIsPressed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

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
    }, 1000);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    clearTimeout(timeoutIdRef.current);
    const userId = localStorage.getItem("userId");
    if (userId) {
      setShowButton(true);
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
      setShowButton(true);
    } else {
      setTimeout(() => {
        setShowButton(false);
        audioRef.current.pause();
      }, 3500);
    }
  }, [isPressed, fireButton]);

  useEffect(() => {
    audioRef.current = new Audio(FireSound);
    audioRef.current.volume = 0.1;
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
      <div
        className={` ${
          showButton && showToast
            ? "-translate-x-4 sm:-translate-x-8 visible"
            : "invisible translate-x-full"
        } rounded z-50  cursor-pointer duration-300 fixed top-4 right-4 py-2 px-4  bg-blue-600 text-slate-100 shadow-lg`}
      >
        Session Cleared !!!
      </div>

      <div
        className={`${
          showToast ? "visible" : "invisible"
        } absolute  sm:bottom-12 bottom-[1.4rem] z-40 -right-[22.8rem] sm:-right-[19.7rem]`}
      >
        <img
          src="/gif/giphy.gif"
          style={{ WebkitUserDrag: "none" }}
          className="h-[30%] w-[30%] select-none user"
        />
      </div>

      <div
        style={{ WebkitUserDrag: "none" }}
        className={`absolute appearance-none outline-none select-none  bottom-4 sm:bottom-10 z-40 right-4 sm:right-16`}
      >
        <div
          style={{ WebkitUserDrag: "none" }}
          title="Click to clear session"
          onClick={handlePointerDown}
          onPointerUp={handlePointerUp}
          className={`${
            showToast ? "bg-red-400/70" : "bg-[#465478]"
          } ${isPressed ? "animate" : "animate-none"} ${
            showButton ? "visible" : "invisible scale-0"
          } duration-100 select-none hover:scale-110 shadow-lg hover:shadow-2xl  cursor-pointer after:animate-ping rounded-full  p-4`}
        >
          <MdLocalFireDepartment
            style={{ WebkitUserDrag: "none" }}
            className="select-none text-red-400 text-2xl z-50 "
          />
        </div>
      </div>
    </>
  );
};

export default DeleteUserId;
