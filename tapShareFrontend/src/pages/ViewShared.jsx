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
  const [isFileAvailable, setIsFileAvailable] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useParams();
  const fetchCode = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}api/v1/code/${id}`);
      const { status, code } = data;
      if (status === 200) {
        if (code.length > 0) {
          setFiles(code);
          setIsFileAvailable(true);
        } else {
          setIsFileAvailable(false);
        }
      } else if (status === 404) {
        setIsFileAvailable(false);
      }
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };
  const fetchFiles = async function fetchFiles() {
    try {
      const { data } = await axios.get(`${baseUrl}${id}`);
      const { status, files } = data;
      if (status === 200) {
        if (files.length > 0) {
          setFiles(files);
          setIsFileAvailable(true);
        } else {
          setIsFileAvailable(false);
        }
      } else if (status === 404) {
        setIsFileAvailable(false);
      }
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    if (id.startsWith("f")) {
      fetchCode();
    } else {
      fetchFiles();
    }
  }, []);
  return (
    <>
      {isFetching ? (
        <FetchingScreen />
      ) : !isFileAvailable ? (
        <NotFoundScreen />
      ) : files.length === 0 ? (
        <FetchingScreen />
      ) : (
        <>
          <div className="flex justify-center min-h-[100dvh] items-center overflow-y-scroll overflow-x-hidden py-12">
            <div className="w-full max-w-[1000px] px-2 sm:px-8 md:px-12 lg:px-20">
              <div className="flex justify-center py-2">
                <h1 className="text-lg sm:text-xl md:text-2xl text-gray-100 ">
                  Keep tapping!!! 👏
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
    </>
  );
}
