import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";
import "../styles/addCode.css";
import { useStore } from "../utility/store";
import storeUser from "../utility/storeUser";
import CodeTitleField from "../components/inputFields/CodeTitleField";
import CancelButton from "../components/buttons/CancelButton";
import CodeTextField from "../components/inputFields/CodeTextField";
import ShareCodeButton from "../components/buttons/ShareCodeButton";
import NewCodeButton from "../components/buttons/NewCodeButton";
export default function AddCode() {
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
  const clearData = () => {
    setText("");
    setTitle("");
  };
  const handleCancel = () => {
    setLoading(false);
    clearData();
    navigate("/");
  };
  const handleNewCode = () => {
    if (!loading) {
      clearData();
    }
  };

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
          <NewCodeButton handleNewCode={handleNewCode} />
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-[#22283C] mt-10 rounded-xl px-2"
          >
            <div className="px-2 pt-6 flex justify-between flex-wrap-reverse gap-2 items-center">
              <CodeTitleField
                setTitle={setTitle}
                title={title}
                type={"readWrite"}
              />
              <CancelButton handleCancel={handleCancel} />
            </div>
            <div className="p-2 mt-1 w-full">
              <CodeTextField text={text} setText={setText} type={"readWrite"} />
            </div>
            <div className="h-[100px] px-2 flex items-center">
              <ShareCodeButton />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
