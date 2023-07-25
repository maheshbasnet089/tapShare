import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import CodeTextField from "../components/inputFields/CodeTextField";
import CodeTitleField from "../components/inputFields/CodeTitleField";
import ShareNewCode from "../components/buttons/ShareNewCode";
import CopyButton from "../components/buttons/CopyButton";
import HomeButton from "../components/buttons/HomeButton";
import FetchingScreen from "../components/animated/FetchingScreen";
import NotFoundScreen from "../components/misc/NotFoundScreen";
const ViewCode = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [fetchedId, setFetchedId] = useState("");
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(true);

  const fetchCode = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/v1/code/single/${id}`);
      if (response.data.status == 200) {
        setTitle(response.data.code.title);
        setText(response.data.code.text);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    if (fetchedId !== id) {
      setFetchedId(id);
      fetchCode();
    }
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
      ) : (
        <>
          {title.length !== 0 && (
            <div className="px-2 py-2">
              <div className="flex justify-end pt-2">
                <ShareNewCode handleShareNewCode={handleShareNewCode} />
              </div>
              <div className="bg-[#22283C] mt-10 rounded-xl px-2">
                <div className="flex justify-center pt-4">
                  <h2 className="text-xl text-gray-200">Keep Tapping 👏</h2>
                </div>

                <div className="px-2 pt-4 flex justify-between flex-wrap-reverse gap-2 items-center">
                  <CodeTitleField
                    setTitle={setTitle}
                    title={title}
                    type={"readOnly"}
                  />
                  <HomeButton />
                </div>
                <div className="p-2 mt-1 w-full">
                  <CodeTextField
                    text={text}
                    setText={setText}
                    type={"readOnly"}
                  />
                </div>
                <div className="h-[80px] px-2 flex items-center">
                  <CopyButton text={text} />
                </div>
              </div>
            </div>
          )}
          {title.length === 0 && (
            <>
              <NotFoundScreen />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ViewCode;
