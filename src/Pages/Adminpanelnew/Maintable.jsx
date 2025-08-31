
import { useEffect, useState } from "react";


import { fetchTables,  getTableById,  insertTable,  updateTable } from "./Api";
import Loader from "../../Comman/Loader";
import { toast } from "react-toastify/unstyled";


export default function Maintable() {
    const[tableerror,settableerror]=useState({})
     const [table1,settable1]=useState({})
    const [loading, setLoading] = useState(false);
      const[tableitems,settableitems]=useState([])
      useEffect(()=>{
        loadtable()
      },[])
const loadtable = async () => {
    setLoading(true);
    try {
      const res = await fetchTables();
      if (res.data.status) settableitems(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const validate = () => {
    let temp = {};
    if (!table1.tablename) temp.tablename = "table count cannot be blank";
    else if (!/^\d*$/.test(table1.tablename)) temp.tablename = "Price must be digits only";
    if (!table1.parcelname) temp.parcelname = "Parcel name can not be blankc";
     else if (!/^\d*$/.test(table1.tablename)) temp.parcelname = "Parcel count must be digits only";
    if (!table1.roomname) temp.roomname = "Room can not be blank";
    else if (!/^\d*$/.test(table1.roomname)) temp.price = "Rooms count must be digits only";
    settableerror(temp);
    return Object.keys(temp).length === 0;
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (table1._id) {
        await updateTable(table1._id,table1);
        toast("Maintable updated successfully!");
      } else {
        await insertTable (table1);
        toast("maintable added successfully!");
      }
      settable1({})
      loadtable();
    } catch (err) {
      toast("Error while saving subcategory!"+err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const res = await getTableById (id);
      settable1(res.data.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <Loader/>}
      <h1 className='text-uppercase'>ENTER TABLE-Parcel-Rooms COUNT</h1>
       <form className="w-50 mx-auto m-5 bg-info pb-3" onSubmit={handleSubmit}>
  <div className="mb-3 text-start p-4">
    <label className="form-label ">Enter Table count</label>
    <input type="text" className="form-control" name="tablename" value={table1.tablename||""}  onChange={(e) => settable1({ ...table1, tablename: e.target.value })} />
{tableerror.tablename? <div className='text-danger'>{tableerror.tablename}</div>:null}
     </div>
     <div className="mb-3 text-start p-4">
    <label className="form-label ">Enter Parcel count</label>
    <input type="text" className="form-control" name="parcelname" value={table1.parcelname||""}  onChange={(e) => settable1({ ...table1, parcelname: e.target.value })} />
{tableerror.parcelname? <div className='text-danger'>{tableerror.parcelname}</div>:null}
     </div>
      <div className="mb-3 text-start p-4">
    <label className="form-label ">Enter Rooms count</label>
    <input type="text" className="form-control" name="roomname" value={table1.roomname||""}  onChange={(e) => settable1({ ...table1, roomname: e.target.value })} />
{tableerror.roomname? <div className='text-danger'>{tableerror.roomname}</div>:null}
     </div>
    <button type="submit" className="btn btn-primary" >{table1._id?'Update':'Submit'}</button>
</form>
<h1 className=" text-uppercase text-bg-info text-white w-75 mx-auto"> THe Table count</h1>
      <table className="table table-success table-striped table-hover text-center w-75 mx-auto table-responsive" border='1'>
        <thead>
          <tr>
            <th>Srno</th>
            <th>Number of Table count</th>
            <th>Number of Parcel count</th>
            <th>Number of Rooms count</th>
            <th colSpan="1">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableitems.length ? tableitems.map((item, index) => (
            <tr key={index}>
              <td style={{ verticalAlign: "middle" }} >{index+1}</td>
              <td style={{ verticalAlign: "middle" }}>{item.tablename}</td>
              <td style={{ verticalAlign: "middle" }}>{item.parcelname}</td>
              <td style={{ verticalAlign: "middle" }}>{item.roomname}</td>
               <td style={{ verticalAlign: "middle" }}><button className="bg bg-warning btn"  value={item._id} onClick={handleEdit}>EDIT</button></td>
              {/* <td style={{ verticalAlign: "middle" }}><button className="bg bg-danger btn" value={item._id} onClick={categorydelete}>Delete</button></td> */}
            </tr>


          )) : <tr><td colSpan={3}>no data found</td></tr>}
        </tbody>
      </table>

    </div>
  )
}
