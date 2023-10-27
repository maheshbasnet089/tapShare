import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
const CodeHistory = ({ data }) => {
  return (
    <>
      <div className="w-full min-[800px]:h-[87dvh]">
        <p className="text-[#efefef] text-[1.1rem] min-[450px]:text-[1.2rem] px-2 min-[450px]:px-4 capitalize">
          {data?.title}'s History
        </p>
        <div className="border px-4 mt-3 py-3 relative w-full bg-[#2e2e2e] rounded max-h-[80dvh] overflow-hidden ">
          <code>
            <pre className="whitespace-pre-wrap overflow-y-scroll max-h-[80dvh]">
              {data?.text}
            </pre>
          </code>
          <div className="absolute top-0 right-0 pr-4 pt-3 ">
            <CopyToClipboard text={data?.text}>
              <BiCopy className="text-[1.2rem] cursor-pointer" />
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeHistory;
