import jsPDF from "jspdf";

export const Printbill=(obj)=>{
    let totalRows=0
    const Mode=obj.mode
    obj.orders.forEach((v,i)=>{
        console.log(v) 
        console.log(i)
    totalRows=totalRows+1})
    const shopName = "Disha-momoose";
  const shopAddress = "Near Power house, Pratapgarh";
  const billDate = new Date().toLocaleString();
const rowHeight = 6;

const headerFooterHeight = 60;
const billHeight = headerFooterHeight + (rowHeight * totalRows);
  
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80,billHeight], // 80mm width
    });

    // ===== HEADER =====
    doc.setFontSize(12);
    doc.text(shopName, 30, 10, { align: "center" });
    doc.setFontSize(9);
    doc.text(shopAddress, 30, 15, { align: "center" })
    doc.text('Mode:'+Mode,  30, 20, {align:"center"})
    doc.text(`Date: ${billDate}`, 30, 28, { align: "center" });

    // ===== TABLE HEADER =====
    let startY = 34;
    doc.setFontSize(9);
    doc.setLineWidth(0.2);
    doc.line(5, startY - 5, 75, startY - 5); // top line

    // Columns: Sr No, Price, Bathrooms, Total Amount
    
    doc.text("Name", 6, startY);
    doc.text("Qty", 30, startY);
    doc.text("Price", 40, startY);
    doc.text("Sub-Total", 50, startY);
    doc.line(5, startY + 1, 75, startY + 1); // line under header

    // ===== TABLE ROWS =====
    let y = startY + 6;
    let grandTotal = 0;

 obj.orders.forEach((item) => {
      const total = Number(item.total);
      grandTotal += total;

      doc.text(String(item.name), 6, y)// Sr No
      doc.text(String(item.qty), 30, y) // Price
      doc.text(String(item.price), 40, y) // Bathrooms
      doc.text(String(item.total), 50, y) // Bathrooms
      y += 6;

      // New Page if height exceeds
      // if (y > 190) {
      //   doc.addPage([80, 200]);
      //   y = 10;
      // }
    });

    // ===== FOOTER =====
    doc.line(5, y + 2, 75, y + 2); // line before grand total
    doc.setFontSize(10);
    doc.text(`Grand Total:Rs ${grandTotal.toFixed(2)}`, 20, y + 8);
    doc.line(5, y + 10, 75, y + 10); // line after grand total

    // ===== PRINT =====
    window.open(doc.output("bloburl"), "_blank").print();
  };

