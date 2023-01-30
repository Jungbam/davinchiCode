import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SignAPI } from '../../../api/axios';
import { queryKeys } from '../../../helpers/queryKeys';
import DavinchiCard from '../ele/DavinchiCard';

const ThrowMine = ({userId,openMine}) => {
  // const {data} = useQuery([queryKeys.MYINFO], SignAPI.myinfo, {
  //     staleTime: 30 * 60 * 1000,
  //     cacheTime: 30 * 60 * 1000,
  //     onSuccess: (res) => {},
  //     onError: () => {},
  // })
  // const userId = data.data.userId
  const { users } = useSelector((state) => state.gameSlice.gameInfo);
   const [select, setSelect] = useState({index : null, value : null})
  const mine = users.filter(el=>el.userId ===userId)[0]?.hand

  return (
    <div>
      <StRow>
        {mine?.map((card,i) => (
          <div key={`${mine.userName}indicated${i}`}>
            <DavinchiCard card={card} onClick={()=>setSelect(prev=>{return{...prev, index : i}})}/>
            {select.index===i&&<p>선택</p>}
          </div>
        ))}
      </StRow>
      <StRow>
        <button onClick={()=>openMine(select)}>결정</button>
      </StRow>
    </div>
  )
}

export default ThrowMine

const StRow = styled.div`
  display: flex;
`