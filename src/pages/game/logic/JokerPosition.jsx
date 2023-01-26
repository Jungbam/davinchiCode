import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import DavinchiCard from '../ele/DavinchiCard'
import Timer from '../ele/Timer'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect } from 'react'

const JokerPosition = ({selectedCard, cardPick}) => {
  const {users} = useSelector(state=>state.gameSlice.gameInfo)
  const [mine, setMine] = useState(users[0]?.hand||[])
  const [picked, setPicked] = useState(true)

  const handleChange = (result) => {
    if (!result.destination) return;
    if(!result.draggableId.includes(12)){
      alert('조커 외의 카드는 움직일 수 없습니다.')
      return
    }
    const items = [...mine];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMine(items);
    setPicked(false)
  };

  useEffect(()=>{
    setMine([...mine, selectedCard])
  },[])
  return (
    <div><p>조커 타일 획득!</p>
    <p>조커 블록을 마우스로 끌어 원하는 자리로 이동시켜 주세요.</p>
    <StAllCard>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="cardlists" direction="horizontal">
          {provided => (
            <div className="cardlists" {...provided.droppableProps} ref={provided.innerRef}>
              <StMyCard>
                {mine?.map((card,i) => (
                  <Draggable draggableId={`card${card?.color}${card?.value}`} index={i} key={`card${card?.color}${card?.value}`}> 
                    {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                      <DavinchiCard card={card} />
                          </div>
                        );                      
                    }}
                  </Draggable>
                ))}
              </StMyCard>
               {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button disabled={picked} onClick={()=>{cardPick(mine)}}>확인</button>
    </StAllCard>
    <Timer/>
    </div>
  )
}

export default JokerPosition
const StAllCard = styled.div`
  height: 120px;
`
const StMyCard = styled.div`
  display: flex;
  gap: 10px;
  height: 120px;
`