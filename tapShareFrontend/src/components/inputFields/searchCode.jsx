import { Modal } from "@mui/material/";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchCode() {
  const navigate = useNavigate();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [alreadyTry, setAlreadyTry] = useState(0);
  const inputRef = useRef(null);
  const handleOpenSearch = () => {
    setSearchOpen(true);
  };
  const handleCloseSearch = () => setSearchOpen(false);
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length <= 3) {
      setShakeInput(true);
      setAlreadyTry((alreadyTry) => alreadyTry + 1);
    } else {
      navigate(`/${search}`);
    }
  };
  useEffect(() => {
    if (isSearchOpen) {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);
  useEffect(() => {
    if (alreadyTry) {
      if (search.length <= 3) {
        setShakeInput(true);
      }
    }
    setShakeInput(false);
  }, [search]);
  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <button
          style={{
            backgroundColor: "transparent",
            border: "1px solid white",
          }}
          onClick={handleOpenSearch}
          type="button"
          className="text-white hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          <span style={{ width: "20px", marginRight: "10px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
          Search Code
        </button>
        <Modal
          open={isSearchOpen}
          onClose={handleCloseSearch}
          aria-labelledby="modal-modal-search"
          aria-describedby="modal-modal-search-code"
        >
          <div className="w-full justify-center flex pt-12 focus:outline-none">
            <div className="bg-[#f6f6f6] w-full max-w-[450px] p-0 rounded-2xl h-[210px]">
              <form onSubmit={handleSubmit} className="w-full pt-2 px-4">
                <h1 className="text-center py-2 text-xl font-semibold select-none">
                  Search Files or Text
                </h1>
                <input
                  name="code"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Enter Code"
                  autoComplete="given-code"
                  className={`${
                    shakeInput
                      ? "animate-shake border-red-400 focus:outline-red-500"
                      : alreadyTry != 0 && search.length <= 5
                      ? "border-red-400 focus:outline-red-500"
                      : "focus:outline-blue-500 border-blue-400"
                  } w-full h-12 rounded-xl px-2 text-center bg-gray-50 outline-none focus:outline-2  border-2  focus:border-0 transition-all duration-150 ease-out focus:bg-gray-100 mb-1`}
                  required
                  title="Enter the code shared by sender"
                  autoFocus={true}
                  ref={inputRef}
                />
                <button className="w-full bg-blue-500 text-md my-2 text-white hover:bg-blue-600 active:bg-blue-400 py-3 rounded-md">
                  Search
                </button>
              </form>
              <h2 className="text-slate-500 text-xs font-semibold w-full px-5 py-2 text-justify select-none">
                Enter the sender code (e.g.'345678') to search for files/text
                shared by that sender.
              </h2>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
