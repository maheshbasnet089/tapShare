import LinkContainer from "./LinkContainer";
export default function ShareAllLinksContainer() {
  return (
    <div className="bg-gray-50 rounded-md mt-10 py-8">
      <div className="w-full flex justify-center pb-2">
        <h2>
          To share <b className="font-black">All</b> files, use this link
        </h2>
      </div>
      <LinkContainer />
    </div>
  );
}
