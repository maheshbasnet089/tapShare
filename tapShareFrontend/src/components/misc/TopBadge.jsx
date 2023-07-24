import { useParams } from "react-router-dom";
export default function TopBadge() {
  const { id } = useParams();
  return (
    <div className="flex justify-between bg-gray-50 py-4 rounded-md px-3 border-l-green-500 border-l-8">
      <b className="select-none">Expires After : 24 hrs</b>
      <div className="flex">
        <b className="font-semibold select-none">Code</b> {" : "}{" "}
        <h2 className="text-blue-500 font-medium select-text">{id}</h2>
      </div>
    </div>
  );
}
