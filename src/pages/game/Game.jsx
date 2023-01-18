import styled from "styled-components";
import { io } from "socket.io-client";
import { SocketId } from "../../helpers/socket";

import Header from "../../components/common/elements/Header";
import UsersBox from "./ele/UsersBox";
import CenterBox from "./ele/CenterBox";
import MyBox from "./ele/MyBox";
import background from "../../assets/images/background.png";

const socket = io.connect("http://localhost:3002/");
// const socket = SocketId.game;

const Game = () => {
  return (
    <>
      <Header />
      <StWrapper>
        <StContainer>
          <UsersBox />
          <CenterBox />
          <MyBox />
        </StContainer>
      </StWrapper>
    </>
  );
};

export default Game;

const StWrapper = styled.div`
  background-image: url(${background});
  background-size: cover;
  height: 100vh;
  background-color: #2b2b2b;
`;

const StContainer = styled.div`
  width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
