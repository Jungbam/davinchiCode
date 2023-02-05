import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../../../components/form/modal/Modal";
import ComplaintBug from "../../../components/common/elements/complaintbug/ComplaintBug";
import { useSelector } from "react-redux";
import { ICON } from "../../../helpers/Icons";

const Header = () => {
  const {roomInfo} = useSelector(state=>state.gameSlice)
  const [modal, setModal] = useState(false);
  const setModalHandler = () => {
    setModal((prev) => !prev);
  };

  return (
    <Navbar>
      <Modal
        modal={modal.toString()}
        closeModal={setModalHandler}
        width="440px"
        height="396px"
      >
        {modal&&<ComplaintBug closeModal={setModalHandler} />}
      </Modal>
      <NavbarInside>
        <NavbarStatus>
          <RoomStauts>
            <RoundStatus>{roomInfo?.members}/{roomInfo?.maxMembers}</RoundStatus>
            <RoundStatus>{roomInfo?.isPlaying?'진행':'대기'}</RoundStatus>
            {roomInfo?.sercet?<img src={ICON.iconLock} alt='잠금'/>:<img src={ICON.iconUnlock} alt='공개방'/>}
          </RoomStauts>
          <SideBar>|</SideBar>
          <div>{roomInfo?.roomId}</div>
          <SideBar>|</SideBar>
          <RoomName>
            {roomInfo?.roomName}
          </RoomName>
        </NavbarStatus>

        <ReportButton onClick={setModalHandler}>
          <img src={ICON.iconSirenHeader} alt='버그 신고' />
          <div>버그신고</div>
        </ReportButton>
      </NavbarInside>
    </Navbar>
  );
};

export default Header;

const Navbar = styled.div`
  color: #ffffff;
  background-color: #111;
  color: #aaaaaa;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;

const NavbarInside = styled.div`
  width: 1080px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoomName = styled.div`
  font-family: Pretendard;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

const NavbarStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const RoomStauts = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ReportButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 76px;
  height: 26px;
  border: solid 1px #000;
  background-color: #232323;
  border-radius: 5px;
  color: #ccc;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: bold;
  gap: 2px;
  & div {
    font-size: 12px;
  }
  cursor: pointer;
`;

const RoundStatus = styled.div`
  border: 1px solid #aaaaaa;
  border-radius: 999px;
  width: 34px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 10px;
  line-height: 100%;
`;

const SideBar = styled.div`
  color: #333;
`;
