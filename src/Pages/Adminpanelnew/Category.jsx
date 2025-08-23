
import React, { useState, useEffect } from "react";

import { deleteCategory, fetchCategories, getCategoryById, insertCategory, updateCategory } from "./Api";
import { toast } from "react-toastify/unstyled";
import Loader from "../../Comman/Loader";

export default function Category() {
    const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchCategories();
      if (res.data.status) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.categoryname) {
      setError("Category name cannot be blank");
      return;
    }

    setLoading(true);
    try {
      if (category._id) {
        await updateCategory(category._id, category);
        toast("Category updated successfully!");
      } else {
        await insertCategory(category);
        toast("Category added successfully!");
      }
      setCategory({});
      setError("");
      loadCategories();
    } catch (err) {
      toast("Error while saving category!"+err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const res = await getCategoryById(id);
      setCategory(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    setLoading(true);
    try {
      await deleteCategory(id);
      toast("Category deleted!");
      loadCategories();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto bg bg-info p-4">
        <input className="form-control mb-3"
          type="text"
          value={category.categoryname || ""}
          onChange={(e) => setCategory({ ...category, categoryname: e.target.value })}
          placeholder="Category name"
        />
        {error && <div className="text-danger">{error}</div>}
        <button type="submit" className=" btn btn-primary mt-2">{category._id ? "Update" : "Add"}</button>
      </form>

      <table className="table table-success table-striped table-hover text-center w-75 mx-auto table-responsive p-4" border='1'>
        <thead>
          <tr><th>#</th><th>Category</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => (
            <tr key={cat._id}>
              <td>{i + 1}</td>
              <td>{cat.categoryname}</td>
              <td>
                <button onClick={() => handleEdit(cat._id)} className="btn btn-warning mx-2">Edit</button>
                <button onClick={() => handleDelete(cat._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
          {!categories.length && <tr><td colSpan="3">No data</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
