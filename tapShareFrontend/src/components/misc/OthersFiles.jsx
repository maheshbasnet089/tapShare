import LinkContainer from "./LinkContainer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function OthersFiles({ files }) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-50 rounded-md mt-10 py-8">
        <div className="w-full flex justify-center pb-2 px-2">
          <h2 className="select-none">
            To {id.startsWith("f") ? "open " : "download "}
            each
            <b className="font-black">
              {id.startsWith("f") ? " code" : " file"}
            </b>
            , click on the{" "}
            <b className="font-[900] text-blue-500">
              {id.startsWith("f") ? "Open " : "Download "}{" "}
            </b>
            button
          </h2>
        </div>
        {files.map((file) => {
          return (
            <LinkContainer
              key={file._id}
              type={file.path ? "download" : "open"}
              link={
                file.path ? file.path : `https://tapshare.xyz/code/${file._id}`
              }
              id={file._id ? file._id : file.path}
              name={file.name ? file.name : file.title}
            />
          );
        })}

        <div className="flex justify-center pt-5">
          <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
            <button
              className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-gray-50 transition-all ease duration-100 w-[161px] active:bg-blue-400 py-2 rounded-md"
              onClick={(e) => navigate("/")}
            >
              Share File
            </button>
            <button
              className="flex items-center gap-1 justify-center text-gray-100 bg-blue-500 w-[161px] hover:bg-blue-600 hover:text-gray-50 transition-all ease duration-100 active:bg-blue-400 rounded-md py-2"
              onClick={() => navigate("/code")}
            >
              Share Code
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
