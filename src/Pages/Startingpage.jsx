import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {cartdataviewbystatus, fetchTables } from './Adminpanelnew/Api'
import { formatDate, formatTime } from './Adminpanelnew/Dateconversion'


export default function Startingpage() {
  const [username,setusername]=useState("")
  const [userdate,setuserdate]=useState("")
  const [tc,settc]=useState(0)
 const [tablearr,settablearr]=useState([])
   const [parcelarr,setparcelarr]=useState([])
    const [roomarr,setroomarr]=useState([])
    const navigate=useNavigate()
    const [loadcartdata,setloadcartdata]=useState([])
  // const [parcelarr,setparcelarr]=useState([])
  // const [roomarr,setroomarr]=useState([])
 

  //  const formatDate = (dateStr) => {
  //   if (!dateStr) return "";
  //   const d = new Date(dateStr);
  //   const day = String(d.getDate()).padStart(2, "0");
  //   const month = String(d.getMonth() + 1).padStart(2, "0");
  //   const year = String(d.getFullYear()).slice(-2); // last 2 digits
  //   return `${day}-${month}-${year}`; // dd-mm-yy
  // };

  // const formatTime = (timeStr) => {
  //   if (!timeStr) return "";
    
  //   const d = new Date(timeStr);
  //  // Format time (hh:mm:ss AM/PM)
  // let hours = d.getHours();
  // const minutes = String(d.getMinutes()).padStart(2, "0");
  // const seconds = String(d.getSeconds()).padStart(2, "0");
  // const ampm = hours >= 12 ? "PM" : "AM";
  // hours = hours % 12 || 12;

  // return `${hours}:${minutes}:${seconds} ${ampm}`;
  // };
  useEffect(()=>{
    setusername(sessionStorage.getItem('username'))
    const datenew= new Date(sessionStorage.getItem('createat'))
    setuserdate(`${formatDate(datenew)} and time is:-${formatTime(datenew)}`)
 loadtable()
 fetchcartdata()
  },[])
      const fetchcartdata= async()=>{
        try {
         let ss= await cartdataviewbystatus('qt')
        if(ss.data.status) setloadcartdata(ss.data.data)
        } catch (error) {
          console.log(error)
        }
      }
  const loadtable= async()=>{
      try {
      let ss= await fetchTables()
        settc(ss.data.data[0].tablename)
      console.log(ss.data.data[0].tablename)
      const newarr=[]
      const newarr2=[]
      const newarr3=[]
      for(let i=0;i<ss.data.data[0].tablename;i++)
        {
          newarr.push(`TABLE${i+1}`)
          newarr2.push(`Parcel${i+1}`)
          newarr3.push(`Room${i+1}`)

    }
      settablearr(newarr)
      setparcelarr(newarr2)
      setroomarr(newarr3)
    } catch (error) {
      console.log(error)
    }
  }

  const logout1=()=>{
  sessionStorage.removeItem("username")

    navigate('/')
  }
  let gotoadmin=()=>{
    navigate('/adminpass')
  }
  const gotoorder=(e)=>{
    //alert(e.target.value)
    let table=e.target.value
    
 const findcartdata=loadcartdata.find((v)=>v.mode==e.target.value)
    if(findcartdata)
      { //alert('find cartdata')
        navigate('/orders',{state:{findcartdata,table}})}
         else 
          {//alert('not findcart data')
            navigate('/orders',{state:{table}})}
  }
  return (
    <>
      <h1 className='bg bg-info text-dark text-uppercase'>this is starting page</h1>
      <ul className="list-group list-group-horizontal-lg">
  <li className="list-group-item"><h5>WELCOME user{username} register on date {userdate}</h5>
</li>
  <li className="list-group-item bg bg-dark text-warning fs-5">Go to Admin Panel <button className=' px-3 rounded-3 py-1 text-warning' onClick={gotoadmin}>Click</button></li>
  <li className="list-group-item"><button className=' p-1 bg bg-info text-danger' onClick={logout1}>LOGOUT</button></li>
</ul>
<h1 className='text-start'>THE DINING TABLE{tc}</h1>
{tablearr.map((item,i)=>{
      
     const findcartdata=loadcartdata.find((v)=>v.mode==item)

return <button value={item}  key={i} className={findcartdata?'btn btn-warning mx-3 my-1':'btn btn-primary mx-3 my-1'} onClick={gotoorder}>{item}</button>
})
 }
<h1 className='text-start'>The Parcel</h1>
{parcelarr.map((item,i)=>{
   const findcartdata=loadcartdata.find((v)=>v.mode==item)
  return <button value={item}  key={i} className={findcartdata?'btn btn-warning mx-3 my-1':'btn btn-primary mx-3 my-1'} onClick={gotoorder}>{item}</button>
}) }
<h1 className='text-start'>The Room</h1>
{roomarr.map((item,i)=>(
  <button value={item}  key={i} className='btn btn-primary mx-3 my-1'>{item}</button>
)) }
    </>
  )
}
