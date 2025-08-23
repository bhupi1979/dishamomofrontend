const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2); // last 2 digits
    return `${day}-${month}-${year}`; // dd-mm-yy
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    
    const d = new Date(timeStr);
   // Format time (hh:mm:ss AM/PM)
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  export {formatDate,formatTime}