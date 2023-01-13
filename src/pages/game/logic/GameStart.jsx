import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components';

const GameStart = () => { // const {room} = useParams()
  const [black, setBlack] = useState('')
  const [peers, setPeers] = useState([]) // peers =[1,2,3,4]
  const [gameChat, setGameChat] = useState([])
  const room =4
  const userID = 3
  const socket = useRef();
  const rooms = useQuery(['roomInfo'],()=>{return console.log('hi')})

  const selectFirstCarddHandler = (e)=>{
    socket.current.emit('selectFirstCard', userID, black)
    setBlack('')
  }
  const setPeersHandler= (roomUser, gameChat)=>{
    setPeers(prev=>[...prev,roomUser])
    setGameChat(prev=>[...prev,gameChat])
  }

   useEffect(()=>{
    socket.current = io.connect(process.env.REACT_APP_SERVER);
    socket.current.emit('gameStart', room, userID)
    socket.current.on('joinedGame', setPeersHandler)
    return () => {
      socket.current.disconnect();
    };
  }, [])

  useEffect(()=>{
  },[socket])
  
  if(peers.length!==rooms.number) return <div>...접속중</div> // 리액트 조기반환

  return (
    <div>
      {peers.map((video,i)=>{
        return (<div key={`peers${i}`}>
          <video>{video}</video>
          <div>{gameChat[i]}</div>
        </div>)
      })}
      <input type='text' value={black} onChange={(e)=>setBlack(e.target.value)}/>
      <button onClick={selectFirstCarddHandler}>패 결정</button>
    </div>
  )
}

export default GameStart
