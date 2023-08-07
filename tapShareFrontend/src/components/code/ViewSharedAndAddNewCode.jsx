import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NewCodeButton from "../buttons/NewCodeButton";
import CodeTitleField from "../inputFields/CodeTitleField";
import CancelButton from "../buttons/CancelButton";
import CodeTextField from "../inputFields/CodeTextField";
import CopyButton from "../buttons/CopyButton";
import ShareCodeButton from "../buttons/ShareCodeButton";
import ShareNewCode from "../buttons/ShareNewCode";
import HomeButton from "../buttons/HomeButton";
import IsFormOrDiv from "./IsFormOrDiv";

const ViewSharedAndAddNewCode = ({
  title,
  text,
  handleCancel,
  handleNewCode,
  onShareNewCode,
  handleSubmit,
  setText,
  setTitle,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isCodePage = currentPath === "/code";

  const isCodeWithIdPage =
    currentPath.startsWith("/code/") && currentPath.length > 6;

  return (
    <div className="px-2 py-2">
      <div className="flex justify-end pt-2">
        {isCodeWithIdPage ? (
          <ShareNewCode handleShareNewCode={onShareNewCode} />
        ) : (
          <NewCodeButton handleNewCode={handleNewCode} />
        )}
      </div>
      <IsFormOrDiv
        isCodeWithIdPage={isCodeWithIdPage}
        handleSubmit={handleSubmit}
      >
        <div className="px-2 pt-6 flex justify-between flex-wrap-reverse gap-2 items-center">
          {isCodeWithIdPage ? (
            <>
              <CodeTitleField
                setTitle={setTitle}
                title={title}
                type="readOnly"
              />
              <HomeButton />
            </>
          ) : (
            <>
              <CodeTitleField
                setTitle={setTitle}
                title={title}
                type={"readWrite"}
              />
              <CancelButton handleCancel={handleCancel} />
            </>
          )}
        </div>
        <div className="p-2 mt-1 w-full">
          <CodeTextField
            text={text}
            setText={setText}
            type={isCodeWithIdPage ? "readOnly" : "readWrite"}
          />
        </div>
        <div className="h-[100px] px-2 flex items-center">
          {isCodeWithIdPage ? <CopyButton text={text} /> : <ShareCodeButton />}
        </div>
      </IsFormOrDiv>
    </div>
  );
};

export default ViewSharedAndAddNewCode;
