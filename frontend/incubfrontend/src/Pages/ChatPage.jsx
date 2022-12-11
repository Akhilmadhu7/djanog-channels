import React, {useEffect, useContext, useState} from 'react'
import Chat from '../components/User/Chat'
import ChatList from '../components/User/ChatList'
import Headers from '../components/User/Headers'

import Axios from "axios";
import Swal from "sweetalert2";
import AuthContext from '../Context/AuthContext';

// import AuthContext from "../../Context/AuthContext";

const baseUrl = "http://127.0.0.1:8000/";

function ChatPage() {
  let { user, logoutUser, authTokens } = useContext(AuthContext);
  const [userChatList,setUserChatList] = useState([])
  const [id, setId] = useState()
  const [chatMessage,setChatMessage] = useState([])
  const [username, setUsername] =useState() 
  const [onMesssage,setOnMessage] = useState()

  const socket = new WebSocket('ws://127.0.0.1:8000/ws/'+id+'/')


  socket.onopen = function(e){
    console.log('Connection Established',e);
  }

  socket.onclose = function(e){
    console.log('Connection lost');
  }

  socket.onerror = function(e){
    console.log('Error',e);
  }

  socket.onmessage = function(e){
    console.log('message',e);
    const data = JSON.parse(e.data)
    setOnMessage(data)
    chatData(username)
  }



  


  useEffect(()=>{
    Axios.get(baseUrl+'chat/chat-user',{
      headers:{
        Authorization:`Bearer ${authTokens.access}`
      }
    }).then((res)=>{
      console.log('result',res.data);
      setUserChatList(res.data)
    })
  },[])

  if (userChatList) {
    console.log('uselist',userChatList);
  }

  const get_id = (id,username)=>{
    console.log('other id is',id,username);
    setId(id)
    setUsername(username)
    chatData(username)
  }

  const chatData = (username)=>{
    // console.log('hhhhhh',username);
    Axios.get(baseUrl+'chat/caaa/'+username,{
      headers:{
        Authorization:`Bearer ${authTokens.access}`
      }
    }).then((res)=>{
      console.log('chat data',res.data);
      setChatMessage(res.data)
    })
  }
  
  const get_message = (message,msg_username)=>{
    console.log('message',message,msg_username);
    // socket.onmessage = JSON.parse(message)
    socket.send(JSON.stringify({
      'message':message,
      'username':msg_username
  }))
  // chatData(username)
  
  }

  

  return (
    <div>

        <Headers></Headers>

      <div className='flex '>
        <div className='w-3/12'>
        <ChatList userChatList={userChatList} get_id={get_id} ></ChatList>
        
        </div>

        <div className='w-9/12'>
        <Chat chatMessage={chatMessage} get_message={get_message} onMessage={onMesssage}></Chat>
        </div>
    </div>


    </div>
  )
}

export default ChatPage