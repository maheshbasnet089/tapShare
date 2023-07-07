import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";
import "../styles/addCode.css";
import { useStore } from "../utility/store";
import UploadingAnimation from "../components/animated/uploadingAnimation";
import storeUser from "../utility/storeUser";
import { VscNewFile } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
const AddCode = () => {
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target);
      formData.append("userId", "f" + localStorage.getItem("userId"));
      const data = Object.fromEntries(formData);
      const response = await axios.post(`${baseUrl}api/v1/code`, data);
      if (response.data.status == 200) {
        setLoading(false);
        navigate("/" + response.data.code.userId);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const clearData = ()=>{
    setText("");
    setTitle("");
  }
  const handleCancel = ()=>{
    setLoading(false);
    clearData();
    navigate("/");
  }
  const handleNewCode = ()=>{
    if(!loading){
      clearData();
    }
  }

  useEffect(() => {
    {
      /** This function creates and store user Id, if it doesnot exist */
    }
    storeUser();
  }, []);
  return (
    <>
      <div className="px-2 py-2">
        <div className="flex justify-end pt-2">
          <button
            className="flex bg-gray-200 gap-2 items-center rounded-xl uppercase font-bold hover:bg-white transition-all ease-in-out duration-100 h-10 w-[170px] text-slate-700 hover:text-slate-800 active:bg-gray-300"
            role="button"
            title="Share new text"
            onClick={handleNewCode}
          >
            <VscNewFile className="text-2xl" /> New Code
          </button>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-[#22283C] mt-10 rounded-xl px-2"
          >
            <div className="px-2 pt-6 flex justify-between flex-wrap-reverse gap-2 items-center">
              <input
                type="text"
                placeholder="Enter a title"
                name="title"
                className="h-12 w-full max-w-[300px] rounded-lg px-3 bg-[#303A55] focus:bg-[#252d41] outline-none text-gray-100 transition-all ease-in-out duration-200 focus:outline-2 focus:outline-blue-800"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div
                className="flex justify-center bg-red-500 gap-2 items-center rounded-xl uppercase font-bold hover:bg-red-600 transition-all ease-in-out duration-100 h-10 w-[130px] text-gray-100 hover:text-gray-50 active:bg-red-300"
                role="button"
                onClick={handleCancel}
              >
                Cancel <RxCross2 className="text-2xl" />
              </div>
            </div>
            <div className="p-2 mt-1 w-full">
              <textarea
                name="text"
                className="w-full max-h-[calc(100dvh-400px)] min-h-[400px] rounded-lg px-3 bg-[#303A55] focus:bg-[#252d41] outline-none text-gray-100 transition-all ease-in-out duration-200 focus:outline-2 focus:outline-blue-800 py-3"
                required
                placeholder="Enter or paste your text/code here.."
                value={text}
                onChange={(e) => setText(e.target.value)}
                title="Enter the text to share"
              ></textarea>
            </div>
            <div className="h-[100px] px-2 flex items-center">
              {loading ? (
                <UploadingAnimation />
              ) : (
                <>
                  <button
                    role="submit"
                    className="bg-blue-500 p-0 text-gray-50 rounded-full text-center font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110 cursor-pointer"
                    title="Share this text"
                  >
                    Share Now
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCode;
