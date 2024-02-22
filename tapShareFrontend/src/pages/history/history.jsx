import HistoryAppBar from "../history/components/app-bar";
import { useHistoryStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineContentCopy } from "react-icons/md";
import DynamicIcon from "../../components/DynamicFileTypeIcon";
import { FormatDateTime } from "../../utility/FormatDateTime";
import HistorySkeleton from "./HistorySkeleton";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/not_found.svg";
import Stack from "@mui/material/Stack";
import { Chip } from "@mui/material";
import { PiFileCode, PiFileSvg, PiFiles } from "react-icons/pi";
import { BiFileFind } from "react-icons/bi";
import { formatFileSize } from "../../utility/FormatFileSize";

const History = () => {
  const navigate = useNavigate();
  // stores
  const getHistory = useHistoryStore((state) => state.getHistory);
  const queryData = useHistoryStore((state) => state.queryData);
  // states

  // react query
  const { data, isFetching } = useQuery({
    queryFn: getHistory,
    queryKey: ["get", "history"],
  });
  const [filter, setFilter] = useState(0);

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const combinedData = data?.codes?.concat(data?.files) || [];
    const sortedData = combinedData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setDatas(
      filter === 1
        ? data?.files || []
        : filter === 2
        ? data?.codes || []
        : sortedData
    );
  }, [data, filter]);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
  };
  const handleView = (id) => {
    id && navigate(`/code/${id}`);
  };
  const handleFilter = (option) => {
    setFilter(option);
  };

  return (
    <>
      <HistoryAppBar />
      <div className="pt-16 text-white fixed w-full">
        <div className="">
          <p className="text-[#efefef] text-[1.1rem] min-[450px]:text-[1.2rem] px-2 min-[450px]:px-4">
            History
          </p>
          <Stack direction="row" sx={{ px: 4, pt: 3, gap: 1 }} spacing={1}>
            <Chip
              variant={filter === 0 ? "outlined" : "filled"}
              icon={<BiFileFind />}
              label="All"
              sx={{
                color: "white",
                ":hover": {
                  backgroundColor: "#303a55",
                },
                backgroundColor: filter === 0 ? "#303a55" : "#4a5880",
                px: 1,
                ".MuiChip-icon": {
                  color: "rgb(147 197 253 / 1)",
                },
              }}
              onClick={() => handleFilter(0)}
            />
            <Chip
              variant={filter === 1 ? "outlined" : "filled"}
              icon={<PiFiles />}
              label="File"
              sx={{
                color: "white",
                ":hover": {
                  backgroundColor: "#303a55",
                },
                backgroundColor: filter === 1 ? "#303a55" : "#4a5880",
                px: 1,
                ".MuiChip-icon": {
                  color: "rgb(147 197 253 / 1)",
                },
              }}
              onClick={() => handleFilter(1)}
            />
            <Chip
              variant={filter === 2 ? "outlined" : "filled"}
              icon={<PiFileCode />}
              label="Code"
              sx={{
                color: "white",
                ":hover": {
                  backgroundColor: "#303a55",
                },
                backgroundColor: filter === 2 ? "#303a55" : "#4a5880",
                px: 1,
                ".MuiChip-icon": {
                  color: "rgb(147 197 253 / 1)",
                },
              }}
              onClick={() => handleFilter(2)}
            />
          </Stack>
          <div className="px-9 mt-3 py-10 h-[90vh] overflow-scroll">
            <ol className="relative border-s pb-6 border-gray-700">
              {isFetching ? (
                <>
                  <HistorySkeleton />
                  <HistorySkeleton />
                  <HistorySkeleton />
                  <HistorySkeleton />
                </>
              ) : datas.length ? (
                datas?.map((data) => {
                  return (
                    <li key={data?._id} className="mb-10 ms-8">
                      <div className="absolute flex items-center text-blue-300 justify-center w-6 h-6 p-1  rounded-full -start-3 ring-8 ring-[#303a55] bg-[#3c486b]">
                        <DynamicIcon name={data?.name || data?.title} />
                      </div>
                      <h3 className="flex  items-center mb-1 text-lg font-semibold text-white">
                        {data?.name || data?.title}
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
                        <FormatDateTime data={data?.createdAt} />
                      </time>

                      <div className="mb-4  text-base font-normal text-gray-400">
                        <div className="flex gap-1">
                          code: <p>{data?.userId}</p>
                        </div>
                        {data?.size && (
                          <div className="flex gap-1 ">
                            size: <p>{formatFileSize(data?.size)}</p>
                          </div>
                        )}
                        {data?.text && (
                          <div className="mt-3 overflow-hidden line-clamp-3 text-ellipsis">
                            {data?.text}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-start gap-4">
                        <div
                          onClick={() =>
                            data?.path
                              ? handleCopy(data.path)
                              : handleView(data._id)
                          }
                          className="inline-flex items-center cursor-pointer active:scale-95 px-4 py-2 text-sm font-medium  border  rounded-lg  focus:z-10 focus:ring-4 focus:outline-none  focus:text-blue-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 focus:ring-gray-700"
                        >
                          {data?.text ? (
                            <>
                              <FaEye className="w-3.5 h-3.5 me-2.5" />
                              view
                            </>
                          ) : (
                            data?.path && (
                              <>
                                <MdOutlineContentCopy className="w-3.5 h-3.5 me-2.5" />
                                Copy
                              </>
                            )
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div>
                  <img
                    src={notFound}
                    className="mx-auto"
                    alt="there isn't any history"
                  />
                  <p className="text-center mt-4">No History</p>
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
