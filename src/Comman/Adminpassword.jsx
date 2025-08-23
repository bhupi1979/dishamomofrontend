import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify/unstyled'
export default function Adminpassword() {
    const navigate =useNavigate()
    const [passkey,setpasskey]=useState("")
    
    let gotostartpage=()=>{
      window.location.href="/startpage"
    }
let gotoadminpanel=()=>{
   if(import.meta.env.VITE_API_ADMIN_KEY==passkey)
    {toast("U can access Admin Panel", {
                 position: "top-right",
                 autoClose: 2000, // milliseconds
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
   
               })
               sessionStorage.setItem('adminpass',"adminpass")
navigate('/adminpanel')
            }
   else
   {toast("Wrong Admin passkey", {
                 position: "top-right",
                 autoClose: 2000, // milliseconds
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
   
               })
    
    navigate('/startpage')
   }
}
  return (
    <div className='d-flex justify-content-lg-center align-items-center w-50 mx-auto  flex-column' style={{height:'100vh'}}>
      <h3 className='d-block mb-3'>Enter the Admin Pass Key</h3>
      <input type="text" className='form-control d-block mb-3' value={passkey} onChange={(e)=>{setpasskey(e.target.value)}}/>
      <button className='btn btn-danger p-2 d-block ' onClick={gotoadminpanel}>Submit</button>
      <button className='btn btn-danger m-2 p-2 d-block ' onClick={gotostartpage}>Cancel</button>
    </div>
  )
}
