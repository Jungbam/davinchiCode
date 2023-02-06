import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DavinchiCard from "../ele/DavinchiCard";
import Timer from "../ele/Timer";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { BootStrap } from "../../BootStrap";

const JokerPosition = ({ selectedCard, cardPick }) => {
  const { StTitle, StBtn, StText, StWrapper } = BootStrap;
  const { users, turn } = useSelector((state) => state.gameSlice.gameInfo);
  const myCard = users.filter((el) => el.userId === turn);
  const [mine, setMine] = useState(myCard[0]?.hand || []);
  const [picked, setPicked] = useState(true);
  const [vali, setVali] = useState(false);

  const handleChange = (result) => {
    if (!result.destination) return;
    if (!result.draggableId.includes(12)) {
      setVali(true);
      return;
    }
    const items = [...mine];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMine(items);
    setVali(false);
    setPicked(false);
  };
  useEffect(() => {
    setMine([...mine, selectedCard]);
  }, []);
  return (
    <StWrapper>
      <StTitle mgtop="30px">조커 타일 획득!</StTitle>
      <StText mgtop="10px">
        조커 블록을 마우스로 끌어 원하는 자리로 이동시켜 주세요.
      </StText>
      <StAllCard>
        <DragDropContext onDragEnd={handleChange}>
          <Droppable droppableId="cardlists" direction="horizontal">
            {(provided) => (
              <div
                className="cardlists"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <StCardArea>
                  {mine?.map((card, i) => (
                    <Draggable
                      draggableId={`card${card?.color}${card?.value}`}
                      index={i}
                      key={`card${card?.color}${card?.value}`}
                    >
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
                </StCardArea>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </StAllCard>
      {vali && <StVali>조커 외에 타일은 움직이지 않습니다.</StVali>}
      <StBtn
        mgtop="38px"
        width="100px"
        height="32px"
        color="#FFDF24"
        fontSize="14px"
        disabled={picked}
        onClick={() => cardPick(mine)}
      >
        확인
      </StBtn>
      <Timer timeOver={() => cardPick(mine)}/>
    </StWrapper>
  );
};

const StAllCard = styled.div`
  height: 120px;
`;
const StVali = styled.div`
  color: red;
`;
const StCardArea = styled.div`
  height: 62px;
  gap: 4px;
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
`;

export default JokerPosition;
