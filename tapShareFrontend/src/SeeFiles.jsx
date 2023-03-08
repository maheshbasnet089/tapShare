import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const SeeFiles = () => {
  const { id } = useParams();
  const [files, setFiles] = React.useState([]); // [state, setState]
 
  const fetchFiles = async function fetchFiles() {
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
  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
      <h1 style={{marginBottom:"40px"}}>Shared Files (tap to download)</h1>
      {files.map((file) => {
        return (
          <h3 key={file._id}>
            <a href={file.path}> {file.path}</a>
          </h3>
        );
      })}
    </div>
  );
};

export default SeeFiles;
