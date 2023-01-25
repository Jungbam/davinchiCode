import React from 'react'
import Timer from '../ele/Timer'

const GoStop = ({nextTurn, goingContinue}) => {
  return (
    <div>
      <p>상대방의 타일을 지목하시겠습니까?</p>
      <p>다른 상대방에게 넘기려면 "넘어가기" 버튼을, 다시 진행하려면 "진행하기" 버튼을 눌러주세요.</p>
      <button onClick={()=>nextTurn()}>넘어가기</button>
      <button onClick={()=>goingContinue()}>지목하기</button>
      <Timer/>
    </div>
  )
}

export default GoStop