import ShareAllLinksContainer from "../components/misc/ShareAllLinksContainer";
import ShareSingleLinkContainer from "../components/misc/ShareSingleLinkContainer";
export default function SeeShared() {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[1000px] px-2 sm:px-8 md:px-12 lg:px-20">
          <div className="flex justify-between bg-gray-50 py-4 rounded-md px-3 border-l-green-500 border-l-8">
            <b className="select-none">Expires After : 24 hrs</b>
            <div className="flex">
              <b className="font-semibold select-none">Code</b> {" : "}{" "}
              <h2 className="text-blue-500 font-medium select-text">213456</h2>
            </div>
          </div>
          <ShareAllLinksContainer/>
          <ShareSingleLinkContainer />
        </div>
      </div>
    </>
  );
}
