import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import './SeeFiles.css'


const SeeFiles = () => {
  const { id } = useParams();
  const [files, setFiles] = React.useState([]); // [state, setState]

  const fetchFiles = async function fetchFiles() {
    // const res = await axios.get(`https://tapshare.onrender.com/${id}`);
    const res = await axios.get(`http://localhost:1337/${id}`);

    if (res.data.status === 200) {
      setFiles(res.data.files);
    } else {
      alert(res.data.message);
    }
  };
  React.useEffect(() => {
    fetchFiles();
  }, []);

  // copy link JS START
  // Select all the copy buttons on the page
  const copyButtons = document.querySelectorAll(".btn-copy-links");

  // Add a click event listener to each copy button
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get the input element next to the clicked button
      const input = button.parentNode.querySelector(".input-links");

      // Create a new temporary input element
      const tempInput = document.createElement("input");

      // Set the value of the temporary input element to the value of the original input element
      tempInput.value = input.value;

      // Append the temporary input element to the document
      document.body.appendChild(tempInput);

      // Select the text in the temporary input element
      tempInput.select();

      // Copy the selected text to the clipboard using the Clipboard API
      navigator.clipboard.writeText(tempInput.value);

      // Remove the temporary input element from the document
      document.body.removeChild(tempInput);

      // Change the text of the copy button to indicate that the text has been copied
      button.innerText = "Copied!";

      // Set a timeout to change the text of the copy button back to 'Copy' after 2 seconds
      setTimeout(() => {
        button.innerText = "Copy";
      }, 2000);
    });
  });

  // copy link JS END
  return (
    <div>
      <div className="css-container">
        <h3 className="card-links-title title">All done! 👏</h3>
        <div className="css-alert css-alert-success">
          <h5 className="css-alert-text">File Uploaded (10.9 MB)</h5>
        </div>
        <div className="card-links">
          {files.map((file) => {
            return (
              <div className="css-form-control" key={file._id}>
                <label>The share this file, copy this link:</label>
                <div className="form-row">
                  <input
                    type="text"
                    name="link"
                    id="link"
                    className="input-links"
                    value={file.path}
                    readOnly
                  />
                  <button className="css-btn-primary btn-copy-links">
                    Copy
                  </button>
                </div>
              </div>
            );
          })}

          <span><a href="#"><button className="css-btn-primary">Share another</button></a></span>
        </div>
      </div>
    </div>
  );
};

export default SeeFiles;
