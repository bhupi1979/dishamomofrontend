import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify/unstyled'
import Loader from '../Comman/Loader'
import ImageCaptchaForm from '../Comman/captcha'

export default function Login() {
   //const [captchaText, setCaptchaText] = useState("")
    const navigate=useNavigate()
     const [loading, setLoading] = useState(false)
    
      const [formdata,setformdata]=useState({})
      const [error,seterror]=useState({})
      useEffect(()=>{
        if (sessionStorage.getItem('username'))
          window.location.href="/startpage"
      },[])
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
        if(response.data.status && response.data.token)
        {
toast("U are login Successfully!", {
              position: "top-right",
              autoClose: 500, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,

            })
            localStorage.setItem("token", response.data.token)
            sessionStorage.setItem('username',response.data.name1)
            sessionStorage.setItem('createat',response.data.logintime)
            navigate('/startpage')
        }
        else{
          toast(`${response.data.msg}`, {
              position: "top-right",
              autoClose: 500, // milliseconds
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
  
  // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  const temperror={}
   if (formdata.username==""||formdata.username==undefined||formdata.username==null)
    temperror.username="user name can not be blank"

  if(formdata.password==""||formdata.password==undefined||formdata.password==null)
    temperror.password="pass word can not be blank"
  if(formdata.captcha==""||formdata.captcha==undefined||formdata.captcha==null)
    temperror.captcha1="captch can not be blank"

  else  if(formdata.captcha!==localStorage.getItem('captcha'))
    temperror.captcha1="Captcha mismatch"
// alert(temperror.captcha1)
// alert(formdata.captcha)
// alert(localStorage.getItem('captcha'))
  //  else if(!passwordRegex.test(formdata.password))
  //   temperror.password="password must contain at least one alphabate one special char and length more than 8character"
  seterror(temperror)
  return temperror
}
  return (
    <div>
      {loading && <Loader/>}
      <h1 className='text-uppercase'>LOGIN page</h1>
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
  <ImageCaptchaForm/>
  <div className="mb-3 text-start px-4">
    <label  className="form-label"> Enter Captcha</label>
    <input type="text" className="form-control" name="captcha" value={formdata.captcha||""} onChange={handlechange} />
    {error.captcha1? <div className='text-danger'>{error.captcha1}</div>:null}
  </div>
  <button type="submit" className="btn btn-primary" onClick={formsubmit}>Submit</button>
</form>
<div className='text-danger'>if already register click on to <button className='btn btn-info' onClick={()=>{navigate('/register')}}>Register</button></div>
    </div>
  )
}
