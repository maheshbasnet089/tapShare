import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/seeFiles.css";
import { IoMdDownload } from "react-icons/io";
import { MdContentCopy, MdOutlineQrCode } from "react-icons/md";

//model
import { Box } from "@mui/material";

import {Modal} from "@mui/material/";
// import { baseUrl, frontendUrlProd, frontendUrlProdCode } from "./config";
import {
  baseUrl,
  frontendUrlDev,
  frontendUrlProd,
  frontendUrlProdCode,
} from "../config";
import QRCode from "qrcode.react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const SeeFiles = () => {
  //model START
  const currentUrl = window.location.href;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const [files, setFiles] = React.useState([]); // [state, setState]

  const fetchFiles = async function fetchFiles() {
    const res = await axios.get(`${baseUrl}${id}`);
    // const res = await axios.get(`http://localhost:1337/${id}`)
    if (res.data.status === 200) {
      setFiles(res.data.files);
    } else {
      alert("Something Went Wrong ! Try again ");
    }
  };
  function handleScan(data) {
    if (data) {
      window.location.href = data;
    }
  }

  const fetchCode = async () => {
    const res = await axios.get(`${baseUrl}api/v1/code/${id}`);
    if (res.data.status === 200) {
      setFiles(res.data.code);
    } else {
      alert("Something Went Wrong ! Try again ");
    }
  };

  React.useEffect(() => {
    if (id.startsWith("f")) {
      fetchCode();
      return;
    }
    fetchFiles();
  }, []);

  // copy link START
  const [shareAllStatus, setShareAllStatus] = useState("Copy"); //for shareAll links
  const copyShareAll = (txt) => {
    setShareAllStatus("Copied");

    setTimeout(() => {
      setShareAllStatus("Copy");
    }, 2500);

    navigator.clipboard.writeText(txt);

    return;
  };

  const [copiedStatus, setCopiedStatus] = useState({}); //for multiple links

  const copyToClipboard = (text, fileId) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedStatus((prevStatus) => ({
          ...prevStatus,
          [fileId]: true,
        }));

        setTimeout(() => {
          setCopiedStatus((prevStatus) => ({
            ...prevStatus,
            [fileId]: false,
          }));
        }, 2500);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  //copy link END

  return (
    <div>
      {localStorage.getItem("userId")?.endsWith(String(id).slice(-1)) ? (
        <div className="css-container">
          <h3 className="card-links-title title">Keep tapping! 👏</h3>

          <div
            className="css-alert css-alert-success"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h6 className="css-alert-text">Expires After : 24 hrs</h6>
            <span className="css-alert-text  ">
              Code : <span style={{ color: "gold" }}>{id}</span>{" "}
            </span>
          </div>
          <div className="card-links">
            <div className="css-form-control">
              <label style={{ textAlign: "center", marginBottom: "10px" }}>
                The share <b>All</b> {id.startsWith("f") ? "codes" : "files"},
                copy this link:
              </label>

              <div className="form-row">
                <input
                  type="text"
                  name="link"
                  id="link"
                  className="input-links"
                  value={"https://tapshare.xyz/" + id}
                  readOnly
                />
                <button
                  className="css-btn-primary btn-copy-links btn-with-icon"
                  onClick={() => copyShareAll("https://tapshare.xyz/" + id)}
                >
                  {shareAllStatus}{" "}
                  <span className="btn-icon">
                    <MdContentCopy />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="card-links">
            <label>
              To share <b>Single</b> {id.startsWith("f") ? "code" : "file"},
              copy below link:
            </label>
            {files.map((file) => {
              {
              }
              return (
                <div className="css-form-control" key={file._id}>
                  <div className="form-row">
                    <input
                      type="text"
                      name="link"
                      id="link"
                      className="input-links"
                      value={
                        file.path
                          ? file.path
                          : `https://tapshare.xyz/code/${file._id}`
                      }
                      readOnly
                    />
                    {file.path ? (
                      <button
                        className="css-btn-primary btn-copy-links btn-with-icon"
                        onClick={() => copyToClipboard(file.path, file._id)}
                      >
                        {copiedStatus[file._id] ? "Copied" : "Copy"}{" "}
                        <span className="btn-icon">
                          <MdContentCopy />
                        </span>
                      </button>
                    ) : (
                      <button
                        className="css-btn-primary btn-copy-links btn-with-icon"
                        onClick={() =>
                          copyToClipboard(
                            "https://tapshare.xyz/code/" + file._id,
                            file._id
                          )
                        }
                      >
                        {copiedStatus[file._id] ? "Copied" : "Copy"}{" "}
                        <span className="btn-icon">
                          <MdContentCopy />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div
              className="main-control-wrap"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                flexWrap: "wrap",
              }}
            >
              <span>
                <a href={frontendUrlProd}>
                  <button className="css-btn-primary btn-primary-reverse">
                    Share Another
                  </button>
                </a>
                {/* <a href={frontendUrlProd}>
                  <button className="css-btn-primary btn-primary-reverse">
                    Share Another
                  </button>
                </a> */}
              </span>
              <span>
                <a href="#">
                  <button
                    className="css-btn-primary btn-with-icon"
                    onClick={handleOpen}
                  >
                    {" "}
                    Share QR{" "}
                    <span className="btn-icon">
                      <MdOutlineQrCode />
                    </span>{" "}
                  </button>
                </a>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="css-container">
          <h3 className="card-links-title title">Keep tapping! 👏</h3>

          <label className="text-sky-300 font-mono">
            {" "}
            {/* // or we can also give =>  text-slate-300 */}
            To {id.startsWith("f") ? "open" : "download"} this{" "}
            {id.startsWith("f") ? "code" : "file"}, click on the{" "}
            {id.startsWith("f") ? "open" : "download"} button
          </label>
          <div className="card-links">
            {files.map((file) => {
              return (
                <div className="css-form-control" key={file._id}>
                  <div className="form-row">
                    <input
                      type="text"
                      name="link"
                      id="link"
                      className="input-links"
                      value={file.name ? file.name : file.title}
                      readOnly
                    />

                    <a href={file.path ? file.path : `/code/${file._id}`}>
                      <button
                        className="css-btn-primary btn-copy-links btn-with-icon"
                        style={{ width: "100%" }}
                      >
                        {file.name ? "Download" : "Open"}
                        <span className="btn-icon">
                          {file.name && <IoMdDownload />}
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              );
            })}

            <div>
              {id.startsWith("f") ? (
                <a href={frontendUrlProdCode}>
                  <button className="css-btn-primary">Share your Code</button>
                </a>
              ) : (
                <a href={frontendUrlProd}>
                  <button className="css-btn-primary">Share your file</button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <QRCode value={currentUrl} size={356} onScan={handleScan} />
        </Box>
      </Modal>
    </div>
  );
};

export default SeeFiles;
