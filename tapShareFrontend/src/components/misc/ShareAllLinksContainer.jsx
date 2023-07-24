import LinkContainer from "./LinkContainer";
import { useParams } from "react-router-dom";
export default function ShareAllLinksContainer() {
  const { id } = useParams();
  return (
    <div className="bg-gray-50 rounded-md mt-10 py-8">
      <div className="w-full flex justify-center pb-2">
        <h2 className="select-none">
          To share <b className="font-black">All</b>{" "}
          {id.startsWith("f") ? "codes" : "files"}, use this link
        </h2>
      </div>
      <LinkContainer
        type={"copy"}
        link={"https://tapshare.xyz/" + id}
        id={id}
        name={"https://tapshare.xyz/" + id}
      />
    </div>
  );
}
