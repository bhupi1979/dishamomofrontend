import { useEffect } from "react";

export default function IdleLogout() {
  useEffect(() => {
    let timeout;

    // Logout function
    const logout = () => {
      sessionStorage.clear();
      //alert("Session expired due to inactivity.");
      window.location.href = "/";
    };

    // Reset Timer on Activity
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 15*60*1000); // 30 minutes
    };

    // User activity events
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // start timer

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  return null; // This component just runs the logic
}
