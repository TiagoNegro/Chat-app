import React from 'react'
import Add from '../img/user-plus.svg'
import Cam from '../img/video-camera.svg'
import More from '../img/dots-three.svg'
import Messages from './Messages'
import Input from './Input'


const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat