import jsPDF from "jspdf";

export const Printqt=(obj)=>{
   let totalrow=0
    const Mode=obj.mode
    obj.orders.forEach((v)=>{
        console.log(v)
            totalrow=totalrow+1
    })
    
    const shopName = "Disha-momoose";
  const shopAddress = "Near Power house, Pratapgarh";
  const billDate = new Date().toLocaleString();
const rowHeight = 6;

const headerFooterHeight = 50;
const billHeight = headerFooterHeight + (rowHeight * totalrow);
  
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
    doc.text(`Mode:-${Mode}`, 30, 22, {align:"center"})
    doc.text(`Date: ${billDate}`, 30, 28, { align: "center" });

    // ===== TABLE HEADER =====
    let startY = 34;
    doc.setFontSize(9);
    doc.setLineWidth(0.2);
    doc.line(5, startY - 5, 75, startY - 5); // top line

    // Columns: Sr No, Price, Bathrooms, Total Amount
    
    doc.text("Name", 16, startY);
    doc.text("Qty", 46, startY);
    // doc.text("Price", 36, startY);
    // doc.text("Sub-Total", 56, startY);
    doc.line(5, startY + 1, 75, startY + 1); // line under header

    // ===== TABLE ROWS =====
    let y = startY + 6;
let grandTotal=0

 obj.orders.forEach((item) => {
      const total = Number(item.qty);
      grandTotal += total;

      doc.text(String(item.name), 16, y); // Sr No
      doc.text(String(item.qty), 46, y); // Price
     
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
    doc.text(`Grand Total: ${grandTotal}`, 30, y + 8);
    doc.line(5, y + 10, 75, y + 10); // line after grand total

    // ===== PRINT =====
    window.open(doc.output("bloburl"), "_blank").print();
  };

