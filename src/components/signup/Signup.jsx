import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './signup.css'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

function Signup (){
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [allowNameUpdt, setAllowNameUpdt] = useState(false)
  const [uname, setUname] = useState('')
  const [regId, setRegId] = useState('')
  const [role, setRole] = useState('student')
  const [company, setCompany] = useState('')
  const [file, setFile] = useState(null)
  const [designation, setDesignation] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [pass, setPass] = useState('')
  const [conPass, setConPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConPass, setShowConPass] = useState(false)
  const [yop, setYop] = useState('')
  const [branch, setBranch] = useState('')
  const [isUpdtProf, setIsUpdtProf] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('id')
    const user = params.get('user')
    if(token){
      axios.post(`${process.env.REACT_APP_BASE_URL}/user/verifyToken`, {token})
      .then((res) => {
        setName(res.data.name)
        setEmail(res.data.email)
        setImageUrl(res.data.imageUrl)
      })
      .catch((error) => {
        console.error('Invalid token:', error);
      })
    }else{
      navigate(-1);
    }
    Cookies.set('email', email)
    if(user === 'old'){
      navigate('/')
    }
  }, [location, navigate, email]);

  const handleFileChange = (e) => {
    const temp = e.target.files[0];
    setFile(temp)
  }

  const imageUpload = async() => {
    if(uname === ''){
      alert('Fill the username to upload image')
      return
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uname', uname);
    axios.patch(`${process.env.REACT_APP_BASE_URL}/user/checkUsername`, {username : uname})
    .then((res) => {
      if(res.data.message !== 'valid'){
        alert(res.data.message)
        return 
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}/user/profilepicUpload`, formData, {
        headers : { 'Content-Type' : 'multipart/form-data', },
      })
      .then((imgRes) => {
        setImageUrl(imgRes.data.imageUrl)
        setAllowNameUpdt(true)
        setIsUpdtProf(!isUpdtProf)
      })
    })
    .catch(err => console.log(err))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(pass.length < 8){
      alert('Password must be at least 8 characters')
      return
    }
    if(pass !== conPass){
      alert('Passwords doesn\'t match')
      return;
    }
    axios.patch(`${process.env.REACT_APP_BASE_URL}/user/checkUsername`, {username : uname})
    .then((res) => {
      if(res.data.message !== 'valid'){
        alert(res.data.message)
        return 
      }
      alert('Please wait for a while')
      axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`,{
        name, email, username:uname, pass, regId, role, imageUrl, yop, branch, company, designation
      })
      .then(finRes => {
        alert(finRes.data.message)
        if(finRes.data.message === 'User Created successfully'){
          navigate('/')
        }
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }

  return(
    <div className="signup flex gap-4 justify-center h-screen w-screen">
      <div className="formHolder flex gap-4 h-fit mt-8 w-11/12 relative">
        <div className="flex w-full">
          <div className='flex flex-col w-1/4'>
            <label htmlFor="name">Name</label><hr />
            <label htmlFor="email">Email</label><hr />
            <label htmlFor="uname">Userame</label><hr/>
            <label htmlFor="pass">Password</label><hr />
            <label htmlFor="conpass">Confirm Password</label><hr />
            <label htmlFor="rno">Roll number</label><hr/>
            <label htmlFor="year">Passed out year</label><hr/>
            <label htmlFor="branch">Branch</label><hr/>
            <label htmlFor="role">Role</label>
            {role && role === 'alumni' && <><hr/><label htmlFor="comp">Company</label><hr/></>}
            {role && role === 'alumni' && <label htmlFor="desg">Designation</label>}
          </div>
          <form className='flex flex-col w-3/5' onSubmit={handleSubmit}>
            <input type="text" id='name' value={name} onChange={(e) => {setName(e.target.value)}} required/><hr />
            <input type="email" id='email' value={email} disabled/><hr />
            <input type="text" id='uname' value={uname} onChange={(e) => {setUname(e.target.value)}} required disabled={allowNameUpdt} /><hr/>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} placeholder='Atleast 8 characters' value={pass} id="pass" onChange={(e) => {setPass(e.target.value)}} style={{width: '98%'}} required/>
              <span className="absolute right-3 top-2" onClick={() => {setShowPass(!showPass)}} >{showPass ? <IoMdEyeOff  /> : <IoMdEye  />}</span>
            </div><hr />
            <div className="relative">
              <input type={showConPass ? 'text' : 'password'} placeholder='Atleast 8 characters' value={conPass} id="conpass" onChange={(e) => {setConPass(e.target.value)}} style={{width: '98%'}} required/>
              <span className="absolute right-3 top-2" onClick={() => {setShowConPass(!showConPass)}} >{showConPass ? <IoMdEyeOff  /> : <IoMdEye  />}</span>
            </div><hr />
            <input type="text" id='rno' value={regId} onChange={(e) => {setRegId(e.target.value)}} required/><hr/>
            <input type="number" id='year' value={yop} onChange={(e) => {setYop(e.target.value)}} required/><hr/>
            <input type="text" id='branch' value={branch} onChange={(e) => {setBranch(e.target.value)}} required/><hr/>
            <select id="role" value={role} onChange={(e) => {setRole(e.target.value)}}>
              <option value="student">student</option>
              <option value="alumni">alumni</option>
            </select>
            {role && role === 'alumni' && <><hr/><input type="text" id='comp' value={company} onChange={e => setCompany(e.target.value)} required placeholder='Avoid acronyms'/><hr/></>}
            {role && role === 'alumni' && <input type="text" id='desg' value={designation} onChange={e => setDesignation(e.target.value)} required />}
            <center><button type="submit">Submit</button></center>
          </form>
        </div>
        <div className='w-fit items-center flex flex-col gap-3'>
          <img src={imageUrl} alt="porfileImage" className='rounded-full w-60 h-60'/>
          <input type="file" name="" accept='image/*' id="imgFile" onChange={handleFileChange} style={{opacity: isUpdtProf ? '1' : '0'}} className='m-0 p-0 text-sm w-fit'/>
          <center>{isUpdtProf ? <button onClick={imageUpload}>Save</button> 
          : <button onClick={() => {setIsUpdtProf(!isUpdtProf)}}>Edit</button>}</center>
        </div>
      </div>
    </div>
  )};

export default Signup