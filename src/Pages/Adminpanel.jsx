// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// //import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify/unstyled'
// import Loader from '../Comman/Loader'
// export default function Adminpanel() {
//   const [category,setcategory]=useState({})
//     const [subcategory,setsubcategory]=useState({})
//   const [error,seterror]=useState({})
 
//   const[tableerror,settableerror]=useState({})
//   const [table1,settable1]=useState({})
  
//   const [subcategoryitems,setsubcategoryitems]=useState([])
//   const[tableitems,settableitems]=useState([])
// // const navigate=useNavigate()
//   useEffect(()=>{
//      if(sessionStorage.getItem('username')==null)
//            window.location.href="/"
//           if(sessionStorage.getItem('adminpass')==null)
//             if(sessionStorage.getItem('username')!=null)
//             window.location.href="/startpage"
//             else
//               window.location.href="/"
          
//           fetchsubcategoryitems()
//           fetchtableitems()
//     },[])
//     //this is for main categorey items data fecthc******
//     //******************************************** */
//   //     const fetchItems = async () => {
//   //   setLoading(true)
//   //   await axios.get(import.meta.env.VITE_API_CATEGORY_VIEW).then((res) => {
//   //     setLoading(false)
//   //     return res.data
//   //   }).then((finaldata) => {
//   //     // console.log(finaldata)
//   //     if (finaldata.status)
//   //       setcategoryitems(finaldata.data)
//   //   }).catch(error => {
//   //     setLoading(false)
//   //     console.error('Error fetching data:', error); // Handle error
//   //   })
//   // }
//   //*******************************ends of main catgory items fetch */
//   //start of subcategory data fetch****************/
//  const fetchsubcategoryitems = async () => {
//     setLoading(true)
//     await axios.get(import.meta.env.VITE_API_SUBCATEGORY_VIEW).then((res) => {
//       setLoading(false)
//       return res.data
//     }).then((finaldata) => {
//       // console.log(finaldata)
//       if (finaldata.status)
//         setsubcategoryitems(finaldata.data)
//     }).catch(error => {
//       setLoading(false)
//       console.error('Error fetching data:', error); // Handle error
//     })
//   }

//   //*************end of subcategory items */
//   // ******************starto fething tables data
//    const fetchtableitems = async () => {
//     setLoading(true)
//     await axios.get(import.meta.env.VITE_API_TABLE_VIEW).then((res) => {
//       setLoading(false)
//       return res.data
//     }).then((finaldata) => {
//       // console.log(finaldata)
//       if (finaldata.status)
//         settableitems(finaldata.data)
//     }).catch(error => {
//       setLoading(false)
//       console.error('Error fetching data:', error); // Handle error
//     })
//   }
//   //**********end of fetching table data */
//   //*************start of insertion and updation of main category */
//     let formsubmitcategory=(e)=>{
      
//       e.preventDefault()
//       if(category.categoryname==null || category.categoryname==undefined)
//         { setmaincategoryerror("category not be blank")
          
//         }
//         else{
//           if(!category._id)
//           {
// setLoading(true)
//       axios.post(import.meta.env.VITE_API_CATEGORY_INSERT, category).then((response) => {
//         console.log(response.data)
//         setLoading(false)
//         if(response.data.status)
//         {
// toast("U  have entered data  Successfully!", {position: "top-right",
//               autoClose: 2000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             seterror("")
//             setcategory([])
//             fetchItems()
//             // sessionStorage.setItem('username',response.data.name1)
//             //  sessionStorage.setItem('createat',response.data.logintime)
//             // //navigate('/Startpage')
//         }
//         else{
//           toast("U are not enter Successfully!values are duplicate or other issue", {
//               position: "top-right",
//               autoClose: 2000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })

//         }
       

//       }
//         //end of response data

//       )
//         .catch((error) => {
//           setLoading(false)
//           console.error(error)
//           if (error.response) {
//            toast(`Error: ${error.response.data.message || error.response.statusText}`, {
//               position: "top-right",
//               autoClose: 1000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Server responded with a status code out of 2xx
//             //setMsg(`Error: ${error.response.data.message || error.response.statusText}`);
//           } else if (error.request) {
//              toast(`No response from server -network error`, {
//               position: "top-right",
//               autoClose: 1000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Request was made but no response
//             //('No response from server. or network error');
//           } else {
//             toast(`Request error: ${error.message}`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Other errors
//             //setMsg(`Request error: ${error.message}`);
//           }

//         })
//       }
//       else{
//         //updating start here
//           //alert(category._id)
//          // alert(category.categoryname)
//         setLoading(true)
//         axios.put(`${import.meta.env.VITE_API_CATEGORY_UPDATE}/${category._id}`, category).then((res) => {
//           console.log(res)
//           setLoading(false)
//           if (res.data.status) {
//             toast("data update Successfully!", {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             //setMsg("Data saved successfuly")

//           }
//           else if (res.data.status == 0) {
//             toast("data didnot update Successfully!", {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })


//           }

//           fetchItems()
//          setcategory({})
          
//         }).catch((err) => {
//           setLoading(false)
//           console.log(err)

//           if (err.response) {
//             toast(`Error: ${err.response.data.message || err.response.statusText}`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Server responded with a status code out of 2xx
//             // setMsg(`Error: ${error.response.data.message || error.response.statusText}`);
//           }
//           else if (err.request) {
//             toast(`no response from serve or network error or backend not stated`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })


//           }
//         }

//         )


//       }//end of update
//       }//if validation else endh hserer

//     }//end of submitcategory
// //endof main category insertion and ^^^^^^^^^^^^^^^^/
// // *****************end of main category************/
// // start of sucategory
// let formsubmitsubcategory=(e)=>{
//       e.preventDefault()
//       let temperror={}
//       if(subcategory.subcategoryname==null || subcategory.subcategoryname==undefined || subcategory.subcategoryname=="")
//          temperror.subcategoryname="subcategory not be blank"
//           if(subcategory.Maincategoryid==null||subcategory.Maincategoryid==undefined || subcategory.Maincategoryid=="")
//         temperror.Maincategoryid="Select Main category"
//       if(subcategory.price==null ||subcategory.price==undefined)
//         temperror.price="Price can not be blank"
//        else if (!/^\d*$/.test(subcategory.price))
//            temperror.price="price can have only digits"
//           seterror(temperror)

//           /***it check where tempere does not have any eroore */
//           if(!Object.keys(temperror).length>0)
//           if(!subcategory._id)
//           {
// setLoading(true)
//       axios.post(import.meta.env.VITE_API_SUBCATEGORY_INSERT, subcategory).then((response) => {
//         console.log(response.data)
//         setLoading(false)
//         if(response.data.status)
//         {
// toast("U  have entered data  Successfully!", {position: "top-right",
//               autoClose: 2000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             seterror("")
//             setsubcategory([])
//          fetchsubcategoryitems()
//             // sessionStorage.setItem('username',response.data.name1)
//             //  sessionStorage.setItem('createat',response.data.logintime)
//             // //navigate('/Startpage')
//         }
//         else{
//           toast("U are not enter Successfully!values are duplicate or other issue", {
//               position: "top-right",
//               autoClose: 2000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })

//         }
       

//       }
//         //end of response data

//       )
//         .catch((error) => {
//           setLoading(false)
//           console.error(error)
//           if (error.response) {
//            toast(`Error: ${error.response.data.message || error.response.statusText}`, {
//               position: "top-right",
//               autoClose: 1000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Server responded with a status code out of 2xx
//             //setMsg(`Error: ${error.response.data.message || error.response.statusText}`);
//           } else if (error.request) {
//              toast(`No response from server -network error`, {
//               position: "top-right",
//               autoClose: 1000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Request was made but no response
//             //('No response from server. or network error');
//           } else {
//             toast(`Request error: ${error.message}`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Other errors
//             //setMsg(`Request error: ${error.message}`);
//           }

//         })
//       }
//       else{
//         //updating start here
//          // alert(category._id)
//           //alert(category.categoryname)
//         setLoading(true)
//         axios.put(`${import.meta.env.VITE_API_SUBCATEGORY_UPDATE}/${subcategory._id}`, subcategory).then((res) => {
//           console.log(res)
//           setLoading(false)
//           if (res.data.status) {
//             toast("data update Successfully!", {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             //setMsg("Data saved successfuly")

//           }
//           else if (res.data.status == 0) {
//             toast("data didnot update Successfully!", {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })


//           }

//          fetchsubcategoryitems()
//          setsubcategory({})
          
//         }).catch((err) => {
//           setLoading(false)
//           console.log(err)

//           if (err.response) {
//             toast(`Error: ${err.response.data.message || err.response.statusText}`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Server responded with a status code out of 2xx
//             // setMsg(`Error: ${error.response.data.message || error.response.statusText}`);
//           }
//           else if (err.request) {
//             toast(`no response from serve or network error or backend not stated`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })


//           }
//         }

//         )


//       }//end of update
//       //if validation else endh hserer

//     }//end of submitcategory


// //start of table item insert and update**********
// let formsubmitable=(e)=>{
//       e.preventDefault()
//       let temperror={}
//       if(table1.tablename==null || table1.tablename==undefined || table1.tablename=="")
//          temperror.tablename="table count can not be blank"
//         else if (!/^\d*$/.test(table1.tablename))
//            temperror.tablename="Table count can have only digits"
//           if(table1.parcelname==null||table1.parcelname==undefined || table1.parcelname=="")
//         temperror.parcelname="parcle count can not be blank"
//       else if (!/^\d*$/.test(table1.parcelname))
//            temperror.parcelname="Parcel count can have only digits"
//       if(table1.roomname==null ||table1.roomname==undefined)
//         temperror.roomname="Tooms can not be blank"
//        else if (!/^\d*$/.test(table1.roomname))
//            temperror.roomname="ROoms can have only digits"
//           settableerror(temperror)

//           /***it check where tempere does not have any eroore */
//           if(!Object.keys(temperror).length>0)
//           if(!table1._id)
//           {
// setLoading(true)
//       axios.post(import.meta.env.VITE_API_TABLE_INSERT, table1).then((response) => {
//         console.log(response.data)
//         setLoading(false)
//         if(response.data.status)
//         {
// toast("U  have entered data  Successfully!", {position: "top-right",
//               autoClose: 2000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             seterror({})
//             settable1({})
//          fetchtableitems()
//             // sessionStorage.setItem('username',response.data.name1)
//             //  sessionStorage.setItem('createat',response.data.logintime)
//             // //navigate('/Startpage')
//         }
//         else{
//           toast("U are not enter Successfully!values are duplicate or other issue", {
//               position: "top-right",
//               autoClose: 2000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })

//         }
       

//       }
//         //end of response data

//       )
//         .catch((error) => {
//           setLoading(false)
//           console.error(error)
//           if (error.response) {
//            toast(`Error: ${error.response.data.message || error.response.statusText}`, {
//               position: "top-right",
//               autoClose: 1000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Server responded with a status code out of 2xx
//             //setMsg(`Error: ${error.response.data.message || error.response.statusText}`);
//           } else if (error.request) {
//              toast(`No response from server -network error`, {
//               position: "top-right",
//               autoClose: 1000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Request was made but no response
//             //('No response from server. or network error');
//           } else {
//             toast(`Request error: ${error.message}`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Other errors
//             //setMsg(`Request error: ${error.message}`);
//           }

//         })
//       }
//       else{
//         //updating start here
//          // alert(category._id)
//           //alert(category.categoryname)
//         setLoading(true)
//         axios.put(`${import.meta.env.VITE_API_TABLE_UPDATE}/${table1._id}`, table1).then((res) => {
//           console.log(res)
//           setLoading(false)
//           if (res.data.status) {
//             toast("data update Successfully!", {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             //setMsg("Data saved successfuly")

//           }
//           else if (res.data.status == 0) {
//             toast("data didnot update Successfully!", {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })


//           }

//          fetchtableitems()
//          settable1({})
          
//         }).catch((err) => {
//           setLoading(false)
//           console.log(err)

//           if (err.response) {
//             toast(`Error: ${err.response.data.message || err.response.statusText}`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })
//             // Server responded with a status code out of 2xx
//             // setMsg(`Error: ${error.response.data.message || error.response.statusText}`);
//           }
//           else if (err.request) {
//             toast(`no response from serve or network error or backend not stated`, {
//               position: "top-right",
//               autoClose: 3000, // milliseconds
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,

//             })


//           }
//         }

//         )


//       }//end of update
//       //if validation else endh hserer

//     }//end of submitcategory
// //************************************* */
//     let gotostartpage=()=>{
//       sessionStorage.removeItem('adminpass')
//       window.location.href="/startpage"
//     }
//     // start of delete category
//     let categorydelete=(e)=>{
//       let id=e.target.value
      
//         let confirm1 = confirm("DO YOU WANT DELETE THIS CATEGORY RECORD")
//     if (confirm1) {
//       setLoading(true)
//        axios.delete(`${import.meta.env.VITE_API_CATEGORY_DELETE}/${id}`).then((res) => {
//         setLoading(false)
//         toast("data deleted Successfully!", {
//           position: "top-right",
//           autoClose: 3000, // milliseconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,

//         })
//         console.log(res.data)
//         fetchItems()
//       }).catch((err) => {
//         setLoading(false)
//         console.log(err.data)
//         toast("data not delete", {
//           position: "top-right",
//           autoClose: 3000, // milliseconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,

//         })
//       })

//     }
//     }
//     //end of delete category
//     let categoryedit= async(e)=>{
//       let id=e.target.value 
     
// setLoading(true)
    
    
//     await axios.get(`${import.meta.env.VITE_API_CATEGORY_BYID}/${id}`).then((res) => {
//       setLoading(false)
//       console.log(res.data.data)
//       console.log(res.data.data.name)
//       setcategory(res.data.data)
     
 
//     }).catch(error => {
//       setLoading(false)
//       console.error('Error fetching data:', error); // Handle error
//     })
//     }
//     //*********end of categoryedit */
//     //start of updating the subcategory
// let subcategoryedit= async(e)=>{
//       let id=e.target.value 
     
// setLoading(true)
    
    
//     await axios.get(`${import.meta.env.VITE_API_SUBCATEGORY_BYID}/${id}`).then((res) => {
//       setLoading(false)
//       console.log(res.data.data)
//       console.log(res.data.data.name)
//       setsubcategory(res.data.data)
     
 
//     }).catch(error => {
//       setLoading(false)
//       console.error('Error fetching data:', error); // Handle error
//     })
//     }
//     //end of update subcategory
//     //sub category delete**********
//      let subcategorydelete=(e)=>{
//       let id=e.target.value
      
//         let confirm1 = confirm("DO YOU WANT DELETE THIS subCATEGORY RECORD")
//     if (confirm1) {
//       setLoading(true)
//        axios.delete(`${import.meta.env.VITE_API_SUBCATEGORY_DELETE}/${id}`).then((res) => {
//         setLoading(false)
//         toast("data deleted Successfully!", {
//           position: "top-right",
//           autoClose: 3000, // milliseconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,

//         })
//         console.log(res.data)
//         fetchsubcategoryitems()
//       }).catch((err) => {
//         setLoading(false)
//         console.log(err.data)
//         toast("data not delete", {
//           position: "top-right",
//           autoClose: 3000, // milliseconds
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,

//         })
//       })

//     }
//     }
//     //***************end here subcategory delete */
//     //************start updation of table parcel and rooms coutn */
//     let tableedit= async(e)=>{
//       let id=e.target.value 
//       setLoading(true)
//       await axios.get(`${import.meta.env.VITE_API_TABLE_BYID}/${id}`).then((res) => {
//       setLoading(false)
//       console.log(res.data.data)
//       console.log(res.data.data.name)
//       settable1(res.data.data)
//       }).catch(error => {
//       setLoading(false)
//       console.error('Error fetching data:', error); // Handle error
//     })
//     }
//   return (
//     <div>
//     <h1>WELCOME TO ADMIN PANEL</h1><p className='position-fixed top-0 end-0'><button onClick={gotostartpage}>LOGOUT OR GOTO STARt PAFGE</button></p>
//     <ul className="nav nav-tabs" id="myTab" role="tablist">
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link active"
//             id="home-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#home"
//             type="button"
//             role="tab"
//             aria-controls="home"
//             aria-selected="true"
//           >
//             Category
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link"
//             id="subcategory-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#subcategory"
//             type="button"
//             role="tab"
//             aria-controls="subcategory"
//             aria-selected="false"
//           >
//             Sub-Category
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link"
//             id="Tables-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#Tables"
//             type="button"
//             role="tab"
//             aria-controls="Tables"
//             aria-selected="false"
//           >
//             Tables-Parcels-Rooms
//           </button>
//         </li>
        
//       </ul>

//       <div className="tab-content" id="myTabContent">
//         <div
//           className="tab-pane fade show active"
//           id="home"
//           role="tabpanel"
//           aria-labelledby="home-tab"
//         >
//           <h3 className='text-start'> This is Main Category section u can add various category of items just like beverages for drinking item Dal for varous dal chapti for various types of chapati Vegetable for varios types of vegetables  </h3>
// {/* main category start herer */}
// <div>
//       {loading && <Loader/>}
//       <h1 className='text-uppercase'>ENTER Category</h1>
//        <form className="w-50 mx-auto m-5 bg-info pb-3" onSubmit={formsubmitcategory}>
//   <div className="mb-3 text-start p-4">
//     <label className="form-label ">Enter Main category</label>
//     <input type="text" className="form-control" name="categoryname" value={category.categoryname||""}  onChange={(e) => setcategory({ ...category, categoryname: e.target.value })} />
// {maincategoryerror? <div className='text-danger'>{maincategoryerror}</div>:null}
//      </div>
//     <button type="submit" className="btn btn-primary" >{category._id?'Update':'Submit'}</button>
// </form>
// <h1 className=" text-uppercase text-bg-info text-white w-75 mx-auto"> The List of Category ITems</h1>
//       <table className="table table-success table-striped table-hover text-center w-75 mx-auto table-responsive" border='1'>
//         <thead>
//           <tr>
//             <th>Srno</th>
//             <th>Name of category</th>
            
//             <th colSpan="2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categoryitems.length ? categoryitems.map((item, index) => (
//             <tr key={index}>
//               <td style={{ verticalAlign: "middle" }} >{index+1}</td>
//               <td style={{ verticalAlign: "middle" }}>{item.categoryname}</td>
              
//                <td style={{ verticalAlign: "middle" }}><button className="bg bg-warning btn"  value={item._id} onClick={categoryedit}>EDIT</button></td>
//               <td style={{ verticalAlign: "middle" }}><button className="bg bg-danger btn" value={item._id} onClick={categorydelete}>Delete</button></td>
//             </tr>


//           )) : <tr><td colSpan={3}>no data found</td></tr>}
//         </tbody>
//       </table>

// </div>
// {/* main category ends herer */}
//           </div>
//         <div
//           className="tab-pane fade"
//           id="subcategory"
//           role="tabpanel"
//           aria-labelledby="profile-tab"
//         >
//           <h3 className='text-start'>u can add here sub category items with thier price</h3>
// {/* this is subcategory form */}
// <div>
//       {loading && <Loader/>}
//       <h1 className='text-uppercase'>ENTER sub Category items detail</h1>
//        <form className="w-50 mx-auto m-5 bg-info pb-3" onSubmit={formsubmitsubcategory}>
//         <div className="mb-3 text-start p-4">
//     <label className="form-label ">Enter Main category</label>
//     <select
//   className="form-select"
//   name="Maincategoryid"
//   value={subcategory.Maincategoryid || ""}
//   onChange={(e) => setsubcategory({ ...subcategory, Maincategoryid: e.target.value })}
// >
//   <option value="">-- Select Category --</option>
//   {categoryitems.map((item) => (
//     <option key={item._id} value={item._id}>
//       {item.categoryname}
//     </option>
//   ))}
// </select>
// {error.Maincategoryid? <div className='text-danger'>{error.Maincategoryid}</div>:null}
//      </div>
//   <div className="mb-3 text-start p-4">
//     <label className="form-label ">Enter subcategory</label>
//     <input type="text" className="form-control" name="subcategoryname" value={subcategory.subcategoryname||""}  onChange={(e) => setsubcategory({ ...subcategory, subcategoryname: e.target.value })} />
// {error.subcategoryname? <div className='text-danger'>{error.subcategoryname  }</div>:null}
//      </div>
//      <div className="mb-3 text-start p-4">
//     <label className="form-label ">Enter subcategory item price</label>
//     <input type="text" className="form-control" name="price" value={subcategory.price||""}  onChange={(e) => setsubcategory({ ...subcategory, price: e.target.value })} />
// {error.price? <div className='text-danger'>{error.price}</div>:null}
//      </div>
//     <button type="submit" className="btn btn-primary" >{subcategory._id?'Update':'Submit'}</button>
// </form>
// <h1 className=" text-uppercase text-bg-info text-white w-75 mx-auto"> The List of subCategory ITems</h1>
//       <table className="table table-success table-striped table-hover text-center w-75 mx-auto table-responsive" border='1'>
//         <thead>
//           <tr>
//             <th>Srno</th>
//             <th>Name of Maincategory</th>
//             <th>Name subcategory item</th>
//             <th>Price of subcategory</th>
//             <th colSpan="2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subcategoryitems.length ? subcategoryitems.map((item, index) => {
//           const match=categoryitems.find(cat=>cat._id===item.Maincategoryid)

//             return(<tr key={index}>
//               <td style={{ verticalAlign: "middle" }} >{index+1}</td>
//               <td style={{ verticalAlign: "middle" }}>{ match?.categoryname || "N/A"}</td>
//               <td style={{ verticalAlign: "middle" }}>{item.subcategoryname}</td>
//               <td style={{ verticalAlign: "middle" }}>{item.price}</td>
//                <td style={{ verticalAlign: "middle" }}><button className="bg bg-warning btn"  value={item._id} onClick={subcategoryedit}>EDIT</button></td>
//               <td style={{ verticalAlign: "middle" }}><button className="bg bg-danger btn" value={item._id} onClick={subcategorydelete}>Delete</button></td>
//             </tr>


// )}) : <tr><td colSpan={3}>no data found</td></tr>}
//         </tbody>
//       </table>

// </div>


//           </div>
//          <div
//           className="tab-pane fade"
//           id="Tables"
//           role="tabpanel"
//           aria-labelledby="profile-tab"
//         >
//           <p className='text-start'> U can enter TOTAL parcel and rooms and TABLE Here.</p>

// {/* table count start here */}
// <div>
//       {loading && <Loader/>}
//       <h1 className='text-uppercase'>ENTER TABLE-Parcel-Rooms COUNT</h1>
//        <form className="w-50 mx-auto m-5 bg-info pb-3" onSubmit={formsubmitable}>
//   <div className="mb-3 text-start p-4">
//     <label className="form-label ">Enter Table count</label>
//     <input type="text" className="form-control" name="tablename" value={table1.tablename||""}  onChange={(e) => settable1({ ...table1, tablename: e.target.value })} />
// {tableerror.tablename? <div className='text-danger'>{tableerror.tablename}</div>:null}
//      </div>
//      <div className="mb-3 text-start p-4">
//     <label className="form-label ">Enter Parcel count</label>
//     <input type="text" className="form-control" name="parcelname" value={table1.parcelname||""}  onChange={(e) => settable1({ ...table1, parcelname: e.target.value })} />
// {tableerror.parcelname? <div className='text-danger'>{tableerror.parcelname}</div>:null}
//      </div>
//       <div className="mb-3 text-start p-4">
//     <label className="form-label ">Enter Rooms count</label>
//     <input type="text" className="form-control" name="roomname" value={table1.roomname||""}  onChange={(e) => settable1({ ...table1, roomname: e.target.value })} />
// {tableerror.roomname? <div className='text-danger'>{tableerror.roomname}</div>:null}
//      </div>
//     <button type="submit" className="btn btn-primary" >{table1._id?'Update':'Submit'}</button>
// </form>
// <h1 className=" text-uppercase text-bg-info text-white w-75 mx-auto"> THe Table count</h1>
//       <table className="table table-success table-striped table-hover text-center w-75 mx-auto table-responsive" border='1'>
//         <thead>
//           <tr>
//             <th>Srno</th>
//             <th>Number of Table count</th>
//             <th>Number of Parcel count</th>
//             <th>Number of Rooms count</th>
//             <th colSpan="1">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableitems.length ? tableitems.map((item, index) => (
//             <tr key={index}>
//               <td style={{ verticalAlign: "middle" }} >{index+1}</td>
//               <td style={{ verticalAlign: "middle" }}>{item.tablename}</td>
//               <td style={{ verticalAlign: "middle" }}>{item.parcelname}</td>
//               <td style={{ verticalAlign: "middle" }}>{item.roomname}</td>
//                <td style={{ verticalAlign: "middle" }}><button className="bg bg-warning btn"  value={item._id} onClick={tableedit}>EDIT</button></td>
//               {/* <td style={{ verticalAlign: "middle" }}><button className="bg bg-danger btn" value={item._id} onClick={categorydelete}>Delete</button></td> */}
//             </tr>


//           )) : <tr><td colSpan={3}>no data found</td></tr>}
//         </tbody>
//       </table>

// </div>
// {/* table count ends here */}
//         </div>
        
         
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";

import Category from "./Adminpanelnew/Category";
import Subcategory from "./Adminpanelnew/Subcategory";
import Maintable from "./Adminpanelnew/Maintable";
import { fetchCategories } from "./Adminpanelnew/Api";
import Reports from "./Adminpanelnew/Reports";

export default function AdminPanel() {
  const[categories,setCategories]=useState([])
  useEffect(() => {
    if (!sessionStorage.getItem("username")) window.location.href = "/";
    else if (!sessionStorage.getItem("adminpass")) window.location.href = "/startpage";
  }, []);

  const logout = () => {
    sessionStorage.removeItem("adminpass");
    window.location.href = "/Startpage";
  };
const loadCategories = async () => {
  
    try {
      const res = await fetchCategories();
      if (res.data.status) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    } 
  };
  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={logout}>Logout</button>

      <ul className="nav nav-tabs">
        <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#cat">Categories</button></li>
        <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#subcat" onClick={loadCategories}>Subcategories</button></li>
        <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#tables">Tables</button></li>
                <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#reports">Reports</button></li>

      </ul>

      <div className="tab-content">
        <div id="cat" className="tab-pane fade show active"><Category /></div>
        <div id="subcat" className="tab-pane fade"><Subcategory categories={categories}/></div>
        <div id="tables" className="tab-pane fade"><Maintable /></div>
                <div id="reports" className="tab-pane fade"><Reports /></div>

      </div>
    </div>
  );
}
