import React, { useEffect } from "react";
import CategoryManager from "./CategoryManager";
import SubCategoryManager from "./SubCategoryManager";
import TableManager from "./TableManager";
import { useNavigate } from "react-router-dom";

export default function AdminPanelnew() {
  const navigate=useNavigate()
  useEffect(() => {
    if (!sessionStorage.getItem("username")) navigate("/")
    else if (!sessionStorage.getItem("adminpass")) navigate("/startpage")
  }, []);

  const logout = () => {
    sessionStorage.removeItem("adminpass");
    navigate("/startpage")
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={logout}>Logout</button>

      <ul className="nav nav-tabs">
        <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#cat">Categories</button></li>
        <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#subcat">Subcategories</button></li>
        <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#tables">Tables</button></li>
      </ul>

      <div className="tab-content">
        <div id="cat" className="tab-pane fade show active"><CategoryManager /></div>
        <div id="subcat" className="tab-pane fade"><SubCategoryManager /></div>
        <div id="tables" className="tab-pane fade"><TableManager /></div>
      </div>
    </div>
  );
}
