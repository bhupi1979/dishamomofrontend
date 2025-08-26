import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify/unstyled'

import Loader from '../Comman/Loader'
export default function Register() {
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const [formdata,setformdata]=useState({})
  const [error,seterror]=useState({})
useEffect(()=>{
        if(sessionStorage.getItem('username'))
           navigate('/startpage')
          if(sessionStorage.getItem('adminpass'))
          navigate('/adminpanel')
      },[navigate])
const handlechange=(e)=>{
const {name,value}=e.target
setformdata((prev)=>({...prev,[name]:value}))
}
let formsubmit=(e)=>{
   
  e.preventDefault()
 
let  isvaliderror=isvalid()
if(!Object.keys(isvaliderror).length>0)
{
     setLoading(true)
      axios.post(import.meta.env.VITE_API_REGISTER, formdata).then((response) => {
        console.log(response.data)
        setLoading(false)
        if(response.data.status)
        {
toast("U are register Successfully!", {
              position: "top-right",
              autoClose: 2000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,

            })
            
            sessionStorage.setItem('username',response.data.name1)
             sessionStorage.setItem('createat',response.data.logintime)
            navigate('/Startpage')
        }
        else{
          toast("U are not register Successfully!values are duplicate or other issue", {
              position: "top-right",
              autoClose: 2000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,

            })

        }
        // console.log(response.data.status)
        // // alert(response.data)
        // if (response.data.status) {
        //   //setMsg("Data saved successfuly")

        // }
        // else if (response.data.status == 0) {

        //   //console.log("the errordata=="+response.data.Error.keyPattern.email)
        //   if (response.data.Error.keyPattern.email)
        //     //("data did not save due to Duplicate Email value")
        //   else if (response.data.Error.keyPattern.phone)
        //     //setMsg(" data disnot save due to Duplicate Phone value")

        // }
        // //studentgetdata()
       

      }
        //end of response data

      )
        .catch((error) => {
          setLoading(false)
          console.error(error)
          if (error.response) {
           toast(`Error: ${error.response.data.message || error.response.statusText}`, {
              position: "top-right",
              autoClose: 1000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,

            })
            // Server responded with a status code out of 2xx
            //setMsg(`Error: ${error.response.data.message || error.response.statusText}`);
          } else if (error.request) {
             toast(`No response from server -network error`, {
              position: "top-right",
              autoClose: 1000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,

            })
            // Request was made but no response
            //('No response from server. or network error');
          } else {
            toast(`Request error: ${error.message}`, {
              position: "top-right",
              autoClose: 3000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,

            })
            // Other errors
            //setMsg(`Request error: ${error.message}`);
          }

        })
      

}//end ofif validation
}//end of form submittted
const isvalid=()=>{
  
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  const temperror={}
   if (formdata.username==""||formdata.username==undefined||formdata.username==null)
    temperror.username="user name can not be blank"

  if(formdata.password==""||formdata.password==undefined||formdata.password==null)
    temperror.password="pass word can not be blank"
   else if(!passwordRegex.test(formdata.password))
    temperror.password="password must contain at least one alphabate one special char and length more than 8character"
  seterror(temperror)
  return temperror
}
  return (
    <div>
      {loading && <Loader/>}
      <h1 className='text-uppercase'>this is register page</h1>
       <form className="w-50 mx-auto m-5 bg-info pb-3">
  <div className="mb-3 text-start px-4">
    <label className="form-label ">Enter UserName</label>
    <input type="text" className="form-control" name="username" value={formdata.username||""} onChange={handlechange}/>
{error.username? <div className='text-danger'>{error.username}</div>:null}
     </div>
  <div className="mb-3 text-start px-4">
    <label  className="form-label"> Enter Password</label>
    <input type="password" className="form-control" name="password" value={formdata.password||""} onChange={handlechange} />
    {error.password? <div className='text-danger'>{error.password}</div>:null}
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={formsubmit}>Submit</button>
</form>
<div className='text-danger'>if already register click on to <button className='btn btn-info' onClick={()=>{navigate('/login')}}>LOGIN</button></div>
    </div>
  )
}
