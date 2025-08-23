import React, { useEffect, useState } from "react";


import { deleteSubCategory, fetchSubCategories, getSubCategoryById, insertSubCategory, updateSubCategory } from "./Api";
import { toast } from "react-toastify/unstyled";
import Loader from "../../Comman/Loader";

export default function Subcategory({categories}) {
  const [loading, setLoading] = useState(false);
  //onst [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [subcategory, setSubcategory] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    //loadCategories();
    loadSubCategories();
  }, []);

//   const loadCategories = async () => {
//     try {
//       const res = await fetchCategories();
//       if (res.data.status) setCategories(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  const loadSubCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchSubCategories();
      if (res.data.status) setSubCategories(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    let temp = {};
    if (!subcategory.subcategoryname) temp.subcategoryname = "Subcategory cannot be blank";
    if (!subcategory.Maincategoryid) temp.Maincategoryid = "Select a category";
    if (!subcategory.price) temp.price = "Price cannot be blank";
    else if (!/^\d*$/.test(subcategory.price)) temp.price = "Price must be digits only";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (subcategory._id) {
        await updateSubCategory(subcategory._id, subcategory);
        toast("Subcategory updated successfully!");
      } else {
        await insertSubCategory(subcategory);
        toast("Subcategory added successfully!");
      }
      setSubcategory({});
      loadSubCategories();
    } catch (err) {
      toast("Error while saving subcategory!"+err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const res = await getSubCategoryById(id);
      setSubcategory(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this subcategory?")) return;
    setLoading(true);
    try {
      await deleteSubCategory(id);
      toast("Subcategory deleted!");
      loadSubCategories();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <h2>Manage Subcategories</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-50 mx-auto m-4 p-3 bg-light border rounded">
        {/* Select Category */}
        <div className="mb-3 text-start">
          <label className="form-label">Select Main Category</label>
          <select
            className="form-select"
            value={subcategory.Maincategoryid || ""}
            onChange={(e) => setSubcategory({ ...subcategory, Maincategoryid: e.target.value })}
          >
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryname}
              </option>
            ))}
          </select>
          {errors.Maincategoryid && <div className="text-danger">{errors.Maincategoryid}</div>}
        </div>

        {/* Subcategory Name */}
        <div className="mb-3 text-start">
          <label className="form-label">Subcategory Name</label>
          <input
            type="text"
            className="form-control"
            value={subcategory.subcategoryname || ""}
            onChange={(e) => setSubcategory({ ...subcategory, subcategoryname: e.target.value })}
          />
          {errors.subcategoryname && <div className="text-danger">{errors.subcategoryname}</div>}
        </div>

        {/* Price */}
        <div className="mb-3 text-start">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            value={subcategory.price || ""}
            onChange={(e) => setSubcategory({ ...subcategory, price: e.target.value })}
          />
          {errors.price && <div className="text-danger">{errors.price}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          {subcategory._id ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <h3 className="mt-4">Subcategory List</h3>
      <table className="table table-striped w-75 mx-auto text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Main Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.length ? (
            subcategories.map((item, i) => {
              const mainCat = categories.find((cat) => cat._id === item.Maincategoryid);
              return (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{mainCat?.categoryname || "N/A"}</td>
                  <td>{item.subcategoryname}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item._id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No subcategories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
