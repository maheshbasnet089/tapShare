import PersonalFiles from "../components/misc/PersonalFiles";
import OthersFiles from "../components/misc/OthersFiles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FetchingScreen from "../components/animated/FetchingScreen";
import NotFoundScreen from "../components/misc/NotFoundScreen";
import { baseUrl } from "../config";

export default function SeeShared() {
  const [files, setFiles] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useParams();
  const fetchCode = async () => {
    const res = await axios.get(`${baseUrl}api/v1/code/${id}`);
    if (res.data.status === 200) {
      setFiles(res.data.code);
    }
  };
  const fetchFiles = async function fetchFiles() {
    const res = await axios.get(`${baseUrl}${id}`);
    if (res.data.status === 200) {
      setFiles(res.data.files);
    }
  };
  useEffect(() => {
    try {
      if (id.startsWith("f")) {
        fetchCode();
      } else {
        fetchFiles();
      }
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  }, []);
  return (
    <>
      {isFetching ? (
        <FetchingScreen />
      ) : (
        <>
          {files.length !== 0 && (
            <>
              <div className="flex justify-center min-h-[100dvh] items-center overflow-y-scroll overflow-x-hidden py-12">
                <div className="w-full max-w-[1000px] px-2 sm:px-8 md:px-12 lg:px-20">
                  <div className="flex justify-center py-2">
                    <h1 className="text-lg sm:text-xl md:text-2xl text-gray-100 ">
                      Keep tapping! 👏
                    </h1>
                  </div>
                  {files && (
                    <>
                      {localStorage
                        .getItem("userId")
                        ?.endsWith(String(id).slice(-1)) && (
                        <PersonalFiles files={files} />
                      )}
                      {!localStorage
                        .getItem("userId")
                        ?.endsWith(String(id).slice(-1)) && (
                        <OthersFiles files={files} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          {files.length === 0 && (
            <>
              <NotFoundScreen />
            </>
          )}
        </>
      )}
    </>
  );
}
