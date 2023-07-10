//123
export default function AnimateStyle({ files }){
  return (
    <div
      className={`w-full h-screen flex items-center justify-center ${
        files && files.length > 0 && "animate"
      } overflow-hidden`}
    >
      <div
        className={`flex justify-center items-center  ${
          files &&
          files.length > 0 &&
          "border border-[#9c9a9a] dark:border-[#efefef]"
        } p-[5em] rounded-full`}
      >
        <div
          className={`flex justify-center items-center  ${
            files &&
            files.length > 0 &&
            "border border-[#bab9b9] dark:border-[#efefef]"
          } p-[5em] rounded-full `}
        >
          <div
            className={`flex justify-center items-center  ${
              files && files.length > 0 && "border dark:border-[#efefef]"
            } p-[5em] rounded-full `}
          >
            <div className="flex justify-center items-center  bg-[rgba(0,0,0,0.2)] p-[2em] rounded-full ">
              <div className="flex justify-center items-center  bg-[#0000004d] p-[2em] rounded-full  overflow-hidden">
                <div className="flex justify-center items-center  bg-[rgba(0,0,0,.4)] p-[2em] rounded-full  overflow-hidden">
                  <div className="h-[4em] w-[4em] bg-[rgba(0,0,0,.8)] rounded-full flex items-center justify-center  hover:bg-[rgba(0,0,0,0.3)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

