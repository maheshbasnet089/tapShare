import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import FetchingScreen from "../components/animated/FetchingScreen";
import NotFoundScreen from "../components/misc/NotFoundScreen";
import ViewSharedAndAddNewCode from "../components/code/ViewSharedAndAddNewCode";

const ViewCode = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(true);

  const fetchCode = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}api/v1/code/single/${id}`);
      const { code, status } = data;
      if (status === 200) {
        const { title, text } = code;
        setTitle(title);
        setText(text);
      }
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCode();
  }, [id]);

  const handleShareNewCode = () => {
    setText("");
    setTitle("");
    navigate("/code");
  };

  return (
    <>
      {isFetching ? (
        <FetchingScreen />
      ) : title.length != 0 ? (
        <ViewSharedAndAddNewCode
          title={title}
          text={text}
          onShareNewCode={handleShareNewCode}
        />
      ) : (
        <NotFoundScreen />
      )}
    </>
  );
};

export default ViewCode;
