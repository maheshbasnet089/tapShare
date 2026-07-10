import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../config";

export default function TopBadge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isCodeShare = id.startsWith("f");

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      let ipAddress = null;
      try {
        const response = await axios.get("https://api64.ipify.org?format=json");
        ipAddress = response.data.ip;
      } catch {
        // IP lookup can fail; deletion still works with clientUserId.
      }

      const clientUserId = localStorage.getItem("userId");
      const payload = { ipAddress, clientUserId };
      const endpoint = isCodeShare
        ? `${baseUrl}api/v1/code/share/${id}/delete`
        : `${baseUrl}api/v1/share/${id}/delete`;

      const res = await axios.post(endpoint, payload);

      if (res.data.status === 200) {
        navigate("/");
      } else {
        setErrorMsg(res.data.message || "Failed to delete share");
      }
    } catch (error) {
      if (!error.response) {
        setErrorMsg(
          "Cannot reach server. For local dev, set VITE_BASE_URL=http://localhost:1337/ in tapShareFrontend/.env and restart the frontend."
        );
      } else if (error.response.status === 404) {
        setErrorMsg(
          error.response.data?.message ||
            "Delete API not found. Deploy the latest backend or use your local backend URL."
        );
      } else {
        setErrorMsg(
          error.response.data?.message ||
            `Failed to delete share (${error.response.status})`
        );
      }
    } finally {
      setLoading(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 py-4 rounded-md px-3 border-l-green-500 border-l-8 gap-2">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-4 items-center">
          <b className="select-none">Your Share</b>
          <span className="text-sm text-gray-500 select-none">
            Files stay until you delete them
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex">
            <b className="font-semibold select-none">Code</b>
            {" : "}
            <h2 className="text-blue-500 font-medium select-text">{id}</h2>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={`px-3 py-1 rounded-md text-sm font-medium text-white transition-colors ${
              confirmDelete
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            } disabled:opacity-50`}
          >
            {loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : confirmDelete ? (
              "Confirm Delete?"
            ) : (
              "Delete Share"
            )}
          </button>

          {confirmDelete && !loading && (
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
}
