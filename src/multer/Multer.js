import React, {useState} from 'react';
import "./multer.css"
import axios from 'axios'
function  Multer() {
  const [file, setFile] = useState();

  const onFileChange = event => {
    setFile(event.target.files[0])
  };

  const send = event => {
    event.preventDefault();

    const headers = {
      "X_FILENAME": file.name,
      'Access-Control-Allow-Origin': '*'
    }
    const api = 'http://localhost:5000/api/fileManager/upload'
    axios.post(api, file, {headers: headers
    }).then((response) => {})
   .catch((error) => {})
  };

    return (
      <div className="App">
      <header className="App-header">
        <form id="uploadForm" encType="multipart/form-data">
          <input type="file" id="file" name="file" onChange={onFileChange}></input>
          <input type="submit" value="Upload" id="upBtn" name="submit" onClick={send}></input>
        </form>
      </header>
    </div>
  )
}

export default Multer;


