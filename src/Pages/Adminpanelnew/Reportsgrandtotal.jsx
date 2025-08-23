import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, {  useState } from 'react'
import DataTable from 'react-data-table-component';
import * as XLSX from "xlsx";
import { formatDate, formatTime } from './Dateconversion';
export default function Reportsgrandtotal(props) {
    const [filterText, setFilterText] = useState("");
    const arraydisplaydata = props.fetchreportdisplaydata?.map((v) => {
  return {
    name: v.mode,
    status: v.status1,
    grandtotal: v.orders.reduce((acc,order)=> acc + order.total, 0),
    datentime:` ${formatDate(v.updatedAt)}::${formatTime(v.updatedAt)}`
  }
}) || [];
const sampleData =arraydisplaydata
// Table Columns
let GrandTotal=arraydisplaydata.reduce((acc,v)=>acc+v.grandtotal,0)
const columns = [{
    name: "Sr No", // Column title
    selector: (row, index) => index + 1, // Row index + 1
     // Optional width
    sortable: false,
  },

  { name: "Name", selector: (row) => row.name, sortable: true },
  { name: "Status", selector: (row) => row.status, sortable: true },
  { name: "Sub-total", selector: (row) => row.grandtotal, sortable: true },
  { name: "DatenTIme", selector: (row) => row.datentime, sortable: true },
  
]


  const filteredData = sampleData.filter((item) =>
    Object.values(item).some((val) =>
      (val ?? "").toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // Export to Excel
  let exportColumns= ["name", "status", "grandtotal","datentime"]
  const exportToExcel = () => {
  // Filtered data banate hain
  const filteredDataex = filteredData.map((item) => {
    let obj = {};
    exportColumns.forEach((col) => {
      obj[col] = item[col];
    });
    return obj;
  });

  // Excel Sheet banate hain
  const worksheet = XLSX.utils.json_to_sheet(filteredDataex);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // File download
  XLSX.writeFile(workbook, "filtered-data.xlsx");
};

  const customStyles = {
  rows: {
    style: {
      fontSize: "16px", // Cell data font size
    },
  },
  headCells: {
    style: {
      fontSize: "18px", // Header font size
      fontWeight: "bold",
    },
  },
};

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.name);
    const tableRows = filteredData.map((row,index) => [
        index+1,
       row.name,
       row.status,
       row.grandtotal,
       row.datentime
    ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });
    doc.save("data.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Title + Actions Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <h2>Table Data</h2>
        <h4 className=' text-danger'>GrandTotal is Rs {GrandTotal}</h4>
        <div style={{ display: "flex", gap: "10px" }}>
           <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
          <button className='btn btn-danger p-1' onClick={exportToExcel}>Export Excel</button>
          <button className="btn btn-warning p-1" onClick={exportToPDF}>Export PDF</button>
        </div>
      </div>

      {/* Data Table */}
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
    </div>
  );
}
