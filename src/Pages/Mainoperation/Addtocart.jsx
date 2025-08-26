import React, { useEffect, useState } from 'react'
import { cartdatainsert, cartdataupdate, fetchCategories,  submaincategorydata } from '../Adminpanelnew/Api';
import Loader from '../../Comman/Loader';
import { toast } from 'react-toastify/unstyled';
import { useLocation, useNavigate } from 'react-router-dom';
import { Printbill } from './Printbill';
import { Printqt } from './Printqt';



export default function Addtocart() {
const [categories, setCategories] = useState([])
const [subcategrydata,setsubcategorydata]=useState([])
const [cartdata,setcartdata]=useState([])
const [loading,setLoading]=useState(false)
const navigate=useNavigate()
const location=useLocation()
const {findcartdata,table}=location.state||{}
  
  useEffect(() => {
    if(table===undefined||table===null||table==="")
      window.location.href="/startpage"
    if(!sessionStorage.getItem('username'))
      window.location.href="/login"
    if(sessionStorage.getItem('adminpass'))
          navigate('/adminpanel')
    loadCategories();
  if(findcartdata)
  { //alert(findcartdata.orders[0].name)
    setcartdata(findcartdata.orders)
  }
  // else{
  //   alert(table)
  // }
  }, []);

  const loadCategories = async () => {
   try {
      const res = await fetchCategories();
      if (res.data.status) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    } 
  }
  
    const oncategorychange = async (e) => {
      let id=e.target.value
      try {
        const res = await submaincategorydata(id);
        if (res.data.status) setsubcategorydata(res.data.data);
      } catch (err) {
        console.error(err);
      }         
      }
    
    
  //oreder handling
     
const handleorder = (subcat) => {
  setcartdata((prev) => {
    const existing = prev.find((item) => item.id === subcat._id)
    if (!existing) {
      // add new item
      return [
        ...prev,
        {
          id: subcat._id,
          name: subcat.subcategoryname,
          qty: 1,
          price: subcat.price,
          total: subcat.price,
        },
      ]
    } else {
      // update quantity immutably
      return prev.map((item) =>
        item.id === subcat._id
          ? { ...item, qty: item.qty + 1, total: item.price * (item.qty + 1) }
          : item
      )
    }
  })
}
//handle click on cart
const handleordercart=(e,subcat)=>{
  let id=e.target.value
  //alert(id)
  switch (id)
     {
      case  "+":
setcartdata((prev) => {
  return prev.map((item) =>
        item.id === subcat.id
          ? { ...item, qty: item.qty + 1, total: item.price * (item.qty + 1) }
          : item
      )
})
break;
case "-" :
  setcartdata((prev) => {
  return prev.map((item) =>
        (item.id === subcat.id) &&(item.qty>1)
          ? { ...item, qty: item.qty - 1, total: item.price * (item.qty - 1) }
          : item
      )
})
break;
case "x":
  setcartdata((prev)=> prev.filter((item)=>item.id!==subcat.id))
  break;
     }
}
/**********startiing of QT generation */
const generateqt = async (e) => {
  if (!cartdata || cartdata.length === 0) {
    alert("Enter some value in cart for order");
    return;
  }

  const qrorbill = e.target.value === "bill" ? "bill" : "qt";

  setLoading(true);

  try {
    if (!findcartdata) {
      // New order
      const obj = { mode: table, status1: qrorbill, orders: cartdata };
      await cartdatainsert(obj);
      toast("cartdata added successfully!");
      qrorbill === "bill" ? Printbill(obj) : Printqt(obj);
    } 
    // else if (findcartdata.status1 === "bill") {
    //   // Old bill → insert fresh order
    //   const newObj = { mode: table, status1: qrorbill, orders: cartdata };
    //   await cartdatainsert(newObj);
    //   toast("New order started after bill!");
    //   qrorbill === "bill" ? Printbill(newObj) : Printqt(newObj);
    // } 
    else {
      // Update ongoing QT
      const updatedObj = { ...findcartdata, status1: qrorbill, orders: cartdata };
      await cartdataupdate(findcartdata._id, updatedObj);
      toast("cartdata updated successfully!");
      qrorbill === "bill" ? Printbill(updatedObj) : Printqt(updatedObj);
    }

    setcartdata([]);
    navigate("/Startpage");
  } catch (err) {
    toast("Error while saving order! " + err);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    {loading&&<Loader/>}
    <h1 className='text-uppercase'>This is add to cart section</h1> <span><button className='btn btn-info' onClick={()=>{navigate("/Startpage")}} >GO-Back</button></span>
    <div className="container">
        <div className="row">
            <div className="col-lg-5">
              <select className="form-select mb-4"
              onChange={oncategorychange}
              >
                <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryname}
              </option>
            ))}
                </select>  
                {/* sub category data from mainctgory id */}
                {subcategrydata.map((cat) => (
              <button key={cat._id} value={cat._id} className='btn btn-warning mx-2 my-2' onClick={()=>handleorder(cat)}>
                {cat.subcategoryname}
              </button>
            ))}
            </div>
            <div className="col-lg-7">
  <h1>THis is cart part</h1>
   <table className="table table-success table-striped table-hover text-center w-75 mx-auto table-responsive p-4" border='1'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>price</th>
            <th>Total</th>
            <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {cartdata.map((cat,i) => (
             <tr key={i}>
            <td>{cat.name}</td>
            <td> <button className='btn btn-info me-2' value={'-'}onClick={(e)=>handleordercart(e,cat)}>-</button><b>{cat.qty}</b><button className='ms-2 btn btn-info' value="+" onClick={(e)=>handleordercart(e,cat)}>+</button></td>
            <td>  {cat.price}</td>
            <td>{cat.total}</td>
            <td><button className='btn btn-danger' value={'x'}onClick={(e)=>handleordercart(e,cat)}>X</button></td>
            </tr>
            ))}
            

        </tbody>
        </table>
        <button className='btn btn-primary me-4' value={cartdata} onClick={generateqt}>GenerateQt</button><button className='btn btn-danger'  value={'bill'} onClick={generateqt}>GeneratBill</button>
            </div>
        </div>
    </div>
    </>
  )
}
