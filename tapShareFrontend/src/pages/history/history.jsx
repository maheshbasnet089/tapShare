import HistoryAppBar from "./components/app-bar";
import { useHistoryStore } from "./store";
import HistoryNav from "./components/history-nav";
import { useEffect } from "react";
const History = () => {
  // stores
  const getHistory = useHistoryStore((state) => state.getHistory);
  const history = useHistoryStore((state) => state.history);
  useEffect(() => {
    getHistory();
  }, [getHistory]);
  return (
    <>
      <HistoryAppBar />
      <div className="pt-16 text-white">
        <div className="">
          <p className="text-[#efefef] text-[1.1rem] min-[450px]:text-[1.2rem] px-2 min-[450px]:px-4">
            History
          </p>
          <p className="h-[1px] bg-slate-300" />
          <div className="px-2 min-[450px]:px-4 min-[800px]:flex gap-x-3">
            <HistoryNav data={history} />
            <div className="border-l pl-2 pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora a
              harum soluta reprehenderit voluptatibus temporibus itaque rem amet
              numquam nesciunt voluptate ullam minima aliquam, rerum vitae
              corporis ipsum velit neque.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
