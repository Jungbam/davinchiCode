import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIndicater, setInitBtn } from '../../../redux/modules/gameSlice'
import OtherTurn from './OtherTurn'

const Indicate = ({selectIndicaterCard, userId}) => {
  const {indicated, gameInfo} = useSelector(state=>state.gameSlice)
  const indicatedUser = gameInfo?.users?.filter(el=>el.userId ===indicated)
  const { turn } = useSelector((state) => state.gameSlice.gameInfo);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setInitBtn())
    return ()=>dispatch(setInitBtn())
  },[])
  if (turn === userId)
  return (
    <div>
      <p>지목할 상대를 선택해주세요!</p>
      <p>다른 참여자의 화면에 있는 '지목하기' 버튼을 클릭하세요.</p>
      {indicated&&
      <div>
        <p>{indicatedUser[0]?.userName}님을 지목상대로 결정하시겠습니까?</p>
        <button onClick={()=>dispatch(setIndicater(null))}>취소</button>
        <button onClick={()=>selectIndicaterCard(indicatedUser)}>결정</button>
      </div>}
    </div>
  )
  else return <OtherTurn text="상대방이 고할지 스톱할지"/>
}

export default Indicate