import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components';

const GameStart = () => { // const {room} = useParams()
  const [black, setBlack] = useState('')
  const room =4
  const userID = 3
  const socket = useRef();

  const selectFirstCarddHandler = (e)=>{
    socket.current.emit('selectFirstCard', userID, black)
    setBlack('')
  }
   useEffect(()=>{
    socket.current = io.connect(process.env.REACT_APP_SERVER);
    socket.current.emit('gameStart', room, userID)
    return () => {
      socket.current.disconnect();
    };
  }, [])

  useEffect(()=>{
  },[socket])

  return (
    <div>
      <input type='text' value={black} onChange={(e)=>setBlack(e.target.value)}/>
      <button onClick={selectFirstCarddHandler}>패 결정</button>
    </div>
  )
}

export default GameStart
