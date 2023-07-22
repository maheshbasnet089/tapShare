import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import CodeTextField from "../components/inputFields/CodeTextField";
import CodeTitleField from "../components/inputFields/CodeTitleField";
import ShareNewCode from "../components/buttons/ShareNewCode";
import CopyButton from "../components/buttons/CopyButton";
import HomeButton from "../components/buttons/HomeButton";
import LoadingSvg from "../components/svg/loadingSvg";
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
        alert("Something Went Wrong ! Try again ");
      }
    } catch (e) {
      alert("Something Went Wrong ! Try again ");
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
      {isFetching && (
        <div className="w-full h-[100dvh] flex justify-center items-center absolute bg-[rgba(0,0,0,0.6)]">
          <div>
            <div>
              <span className="text-xl sm:text-3xl font-bold text-gray-100">
                Fetching Data
              </span>
            </div>
            <div className="flex justify-center">
              <LoadingSvg />
            </div>
          </div>
        </div>
      )}

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
            <CodeTextField text={text} setText={setText} type={"readOnly"} />
          </div>
          <div className="h-[80px] px-2 flex items-center">
            <CopyButton text={text} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCode;
