import React from "react";
import { Group, Text, Accordion } from "@mantine/core";
import { Tabs, rem } from "@mantine/core";
import { MCQTable } from "./MCQTable";
import { FIBTable } from "./FIBTable";

// csvData, csvData2
const MCQDisplay = ({ mcqs, fib }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      <Tabs color="#253a5f" variant="pills" defaultValue="All">
      <div style={{ display: "flex", justifyContent: "spacee-between", marginBottom: "10px", }}>
        <Tabs.List style={{  flex:"1" }}>
          <Tabs.Tab value="All">All</Tabs.Tab>
          <Tabs.Tab value="MCQs">MCQs</Tabs.Tab>
          <Tabs.Tab value="Fill in the blanks">Fill in the blanks</Tabs.Tab>
        </Tabs.List>

        <button
          onClick={scrollToBottom}
          className="btn"
          style={{ width: "fit-content",  }}
        >
          <img src="/down.png" alt="down " width={20} />
        </button>
      </div>
        <Tabs.Panel value="All">
          <Accordion chevronPosition="right" variant="contained">
            {/* {items} */}

            <MCQTable
              data={mcqs}
              // download={csvData}
            />
         

            <FIBTable
              data={fib}
              // download={csvData2}
            />
          </Accordion>
        </Tabs.Panel>

        <Tabs.Panel value="MCQs">
          <Accordion chevronPosition="right" variant="contained">
            <MCQTable
              data={mcqs}
              // download={csvData}
            />
          </Accordion>
        </Tabs.Panel>

        <Tabs.Panel value="Fill in the blanks">
          <Accordion chevronPosition="right" variant="contained">
            <FIBTable
              data={fib}
              //  download={csvData2}
            />
          </Accordion>
        </Tabs.Panel>
      </Tabs>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={scrollToTop}
          className="btn"
          style={{ width: "fit-content" }}
        >
          <img src="/up.png" alt="up " width={20} />
        </button>
      </div>
    </>
  );
};

export default MCQDisplay;
