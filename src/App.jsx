import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import FileUpload from "./components/FileUpload";
import MCQDisplay from "./components/MCQDisplay";
import {Center, Text, Box } from "@mantine/core";
import { Navbar } from "./components/Navbar/Navbar";
import "./index.css";
import Loader from "./components/Loader";

function App() {
  const [mcqs, setMcqs] = useState([]);
  const [fib, setFib] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFileUpload = (data) => {
    setMcqs(data);
  };
  const handleFileUpload2 = (data) => {
    setFib(data);
  };

  useEffect(()=>{
    setLoading(false);
  },[mcqs, fib])


  return (
    <>
      <MantineProvider>
        <Navbar />
        <div className="main-div">
          <div className="sub-div">
            <h1 style={{ color: "#253a5f", margin: "0", flex: "1" }}>
              Question Generator
            </h1>
            <FileUpload onFileUpload={handleFileUpload} onFileUpload2={handleFileUpload2}/>
          </div>
          <div style={{ margin: "20px" }}>
          {(mcqs.length > 0 && fib.length > 0) ? <MCQDisplay mcqs={mcqs} fib={fib} /> : <Center >
                <Loader />
              </Center>}
          </div>
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
