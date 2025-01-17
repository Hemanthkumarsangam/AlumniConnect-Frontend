import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './connect.css'
import Navbar from '../home/Navbar'
import ChatSpace from './ChatSpace'
import { MdAddComment } from "react-icons/md";

function Connect() {
  const[showList, setShowList] = useState(false)
  const[reciever, setReciever] = useState(null)
  const[userList, setUserList] = useState([])
  const[sender, setSender] = useState('')
  const navigate = useNavigate()

  const _id = Cookies.get('_id') || null
  if(_id === null){
    alert('login to continue');
    navigate('/login');
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getUsers`)
        setUserList(res.data.users.filter(user => user._id !== _id))
        setSender(res.data.users.find(user => user._id === _id))
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [_id])

  return (
    <div className='connect'>
      <Navbar/>
      <div className="flex">
      <div className="w-3/12 bg-white relative">
        <button onClick={() => setShowList(!showList)}><MdAddComment/></button>
      {
        showList ? 
        <input type="search" placeholder='Search by name'/>
        :
        <div>
          <input type="search" placeholder='Search by name'/>
          <div className="flex flex-col gap-2">{
            userList.map((user, key) => 
              <div className="flex gap-2" key={key} onClick={() => {setReciever(user)}}>
                <img src={user.imageUrl} alt="user" className="w-12 h-12 rounded-full"/>
                <p>{user.name}</p>
              </div>            
            )
          }</div>
        </div>
      }</div>
        {reciever !== null && <ChatSpace reciever={reciever} id={reciever._id} sender={sender}/>}
      </div>
    </div>
  )
}

export default Connect
