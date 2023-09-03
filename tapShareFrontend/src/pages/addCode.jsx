import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";
import { useStore } from "../utility/store";
import storeUser from "../utility/storeUser";
import CodeTitleField from "../components/inputFields/CodeTitleField";
import CancelButton from "../components/buttons/CancelButton";
import CodeTextField from "../components/inputFields/CodeTextField";
import ShareCodeButton from "../components/buttons/ShareCodeButton";
import NewCodeButton from "../components/buttons/NewCodeButton";
import CopyButton from "../components/buttons/CopyButton";
import ViewSharedAndAddNewCode from "../components/code/ViewSharedAndAddNewCode";
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
      const responseForIp = await axios.get('https://api64.ipify.org?format=json');
      const ipAddress = responseForIp.data.ip
      formData.append("ipAddress",ipAddress)
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
      <ViewSharedAndAddNewCode
        setTitle={setTitle}
        title={title}
        text={text}
        handleCancel={handleCancel}
        handleNewCode={handleNewCode}
        handleSubmit={handleSubmit}
        setText={setText}
      />
    </>
  );
}
