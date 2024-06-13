import { Table, Text, Accordion } from "@mantine/core";

export function FIBTable({ data }) {
  if (data.length > 0) console.log("$$$$$$$$", data);

  const rows = data?.map((item) => (
    <Table.Tr key={item.number}>
      <Table.Td>{item.question}</Table.Td>
      <Table.Td>{item.correct}</Table.Td>
      <Table.Td>{item.bloom_taxonomy}</Table.Td>
    </Table.Tr>
  ));
  const convertToCSV = (fibData) => {
    const headers = ["Question", "Answer", "Bloom's Taxonomy"];
    const rows = fibData.map((item) => [
      item.question,
      item.correct,
      item.bloom_taxonomy,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "fib_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex",  justifyContent: "space-between" }}>
    <Text
              size="xl"
              fw={700}
              c="#253a5f"
              style={{ margin: "10px" }}
              td="underline"
            >
              Fill in the Blanks
            </Text>
      <button onClick={handleDownloadCSV} className="btn" style={{ width: "fit-content", marginBottom:"20px" }}>
        Download Fill in the Blanks CSV
      </button>
      
        {/* <button onClick={scrollToBottom} className="btn" style={{ width: "fit-content", margin: "20px" }}>
          <img src="/down.png" alt="down " width={20}/>
        </button> */}
      </div>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Question</Table.Th>
              <Table.Th>Answer</Table.Th>
              <Table.Th>Bloom's Taxonomy</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <div style={{ display: "flex",  justifyContent: "flex-end" }}>
      {/* <button onClick={scrollToTop} className="btn" style={{ width: "fit-content"}}>
          <img src="/up.png" alt="up " width={20}/>
        </button> */}
        </div>
    </div>
  );
}
