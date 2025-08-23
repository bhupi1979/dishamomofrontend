import React, { useState } from "react";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Reportdisplay(props) {
  const [filterText, setFilterText] = useState("");

  // अगर आपको multconsole.log("Reportdisplay received:", fetchreportdisplaydata)iple reports मिलते हैं
  console.log("Reportdisplay received:", props.fetchreportdisplaydata)
  const reports = Array.isArray(props.fetchreportdisplaydata)
    ? props.fetchreportdisplaydata
    : [props.fetchreportdisplaydata];

  // Table Columns
  const columns = [
    { name: "Sr No", selector: (row, index) => index + 1, sortable: false },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Qty", selector: (row) => row.qty, sortable: true },
    { name: "Price", selector: (row) => row.price, sortable: true },
    { name: "Subtotal", selector: (row) => row.subtotal, sortable: true },
  ];

  const customStyles = {
    rows: {
      style: { fontSize: "16px" },
    },
    headCells: {
      style: { fontSize: "18px", fontWeight: "bold" },
    },
  };

  // Export to Excel
  const exportToExcel = (orders) => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "filtered-data.xlsx");
  };

  // Export to PDF
  const exportToPDF = (orders) => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.name);
    const tableRows = orders.map((row) => [
      row.name,
      row.qty,
      row.price,
      row.subtotal,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("data.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      {reports.map((report, idx) => {
        // Filtered Data
        const filteredData = (report.orders).filter((item) =>
          Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(filterText.toLowerCase())
          )
        );

        // Grand Total
        const grandTotal = filteredData.reduce(
          (acc, item) => acc + (item.subtotal || 0),
          0
        );

        return (
          <div key={idx} style={{ marginBottom: "40px" }}>
            {/* Report Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <h2>
                Mode: {report.mode} | Status: {report.status1} | Date:{" "}
                {new Date(report.updatedAt).toLocaleDateString()}
              </h2>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  style={{ marginBottom: "10px", padding: "5px" }}
                />
                <button onClick={() => exportToExcel(filteredData)}>
                  Export Excel
                </button>
                <button onClick={() => exportToPDF(filteredData)}>
                  Export PDF
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <DataTable
              columns={columns}
              data={filteredData}
              customStyles={customStyles}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 50, 100]}
              highlightOnHover
              striped
            />

            {/* Grand Total */}
            <h3 style={{ textAlign: "right", marginTop: "10px" }}>
              Grand Total: {grandTotal}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
