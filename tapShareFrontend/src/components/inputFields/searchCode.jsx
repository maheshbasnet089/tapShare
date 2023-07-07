import Modal from "@mui/material/Modal";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchCode() {
  const navigate = useNavigate();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const handleOpenSearch = () => {
    setSearchOpen(true);
  };
  const handleCloseSearch = () => setSearchOpen(false);
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length !== 0) {
      navigate(`/${search}`);
    }
  };
  const inputRef = useRef(null);
  useEffect(() => {
    if (isSearchOpen) {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        inputRef.current?.focus();
        console.log(inputRef.current);
      }, 100);
    }
  }, [isSearchOpen]);
  return (
    <div className="relative">
      <div
        className="flex justify-center items-center mt-28 absolute"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
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
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Enter Code"
                  className="w-full h-12 rounded-xl px-2 text-center bg-gray-50 outline-none focus:outline-2 focus:outline-blue-500 border-2 border-blue-400 focus:border-0 transition-all duration-150 ease-out focus:bg-gray-100 mb-1"
                  required
                  title="Enter the code shared by sender"
                  autoFocus={true}
                  ref={inputRef}
                />
                <button className="w-full bg-blue-500 text-md my-2 text-white hover:bg-blue-600 active:bg-blue-400">
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
