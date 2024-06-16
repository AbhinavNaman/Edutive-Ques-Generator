import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const FileUpload = ({ onFileUpload, onFileUpload2 }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("file.pdf");
  const [isLoading, setIsLoading] = useState(false);
  

  const handleFileChange = (e) => {
    setFile(e.target?.files[0]);
    setFileName(e.target?.files[0] ? e.target?.files[0].name : "file.pdf");
  };

function normalizeJson(data) {
  const normalizedData = [];

  for (const section in data) {
    const content = data[section];

    // Find the key that contains the questions
    for (const key in content) {
      const value = content[key];
      if (Array.isArray(value) && value[0] && value[0].questions) {
        const questions = value[0].questions;
        questions.forEach(question => {
          const { number, type, question: questionText, correct, bloom_taxonomy, options } = question;
          const normalizedQuestion = { number, type, question: questionText, correct, bloom_taxonomy };
          
          // Add options if available
          if (options) {
            normalizedQuestion.options = options;
          }

          normalizedData.push(normalizedQuestion);
        });
        break;
      }
    }
  }

  return normalizedData;
}


  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setIsLoading(true);

      try {
        // Send both requests concurrently
        const [mcqsResponse, fillInTheBlanksResponse] = await Promise.all([
          axios.post("https://edutive-backend.onrender.com/api/generate-mcqs/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          axios.post("https://edutive-backend.onrender.com/api/generate-fill-in-the-blank/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
        ]);

        // Handle responses
        if (mcqsResponse.data && fillInTheBlanksResponse.data) {
          const mcqs = normalizeJson(mcqsResponse.data);
          // console.log("@@@@@@",mcqs);
          onFileUpload(mcqs);
          const fib = normalizeJson(fillInTheBlanksResponse.data); 
          // console.log("######",fib);
          onFileUpload2(fib);
        } else {
          throw new Error("Invalid response data");
        }

        // console.log("MCQs Response:", mcqsResponse.data);
        // console.log("Fill in the Blanks Response:", fillInTheBlanksResponse.data);

      } catch (error) {
        console.error("Error uploading file", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="file-upload-container">
      <div className="file-upload-section">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="btn2" style={{ border: "none" }}>
          Choose File
        </label>
        <span className="file-name">{fileName}</span>
        {fileName !== "file.pdf" && (
          <button onClick={handleFileUpload} className="btn">
            Generate MCQs
          </button>
        )}
        {isLoading && <div className="loader"></div>}
      </div>
    </div>
  );
};

export default FileUpload;
