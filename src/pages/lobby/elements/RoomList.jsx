import React from "react";
import styled from "styled-components";
import RoomContents from "./roomListDetail/RoomContents";
import { useState } from "react";
import { motion } from "framer-motion";
import QuickStart from "./roomListDetail/RoomQuickStart";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../../../components/form/modal/Modal";
import CreateRoom from "../../../components/form/modal/sign/CreateRoom";
import { ICON } from "../../../helpers/Icons";
import { RoomAPI } from "../../../api/axios";
import { useDispatch } from "react-redux";

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

// async function fetchPosts(pageNum = 1) {
//   console.log("fetchPosts", pageNum);
//   const response = await axios.get(
//     `https://game.davinci-code.online/rooms?page=${pageNum}`
//   );
//   return response;
// }

const RoomList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [searchRoomModal, setSearchRoomModal] = useState(null);
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [list, setList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const arrLoop = (currentPage) => {
    const newArr = [];
    const pageGroup = Math.ceil(currentPage / 5);
    const last = pageGroup * 5;
    const arrLast = last > totalPage ? totalPage : last;
    const first = last - 4;
    for (let i = first; i <= arrLast; i++) {
      newArr.push(i);
    }
    return newArr;
  };

  const handleCheckboxChange = (isWaiting, isPrivate) => {
    setIsWaiting(isWaiting);
    setIsPrivate(isPrivate);
  };

  const { mutate: searchRoom } = useMutation(
    () => RoomAPI.searchRoom({ searchType, search, currentPage }),
    {
      onSuccess: ({ data }) => {
        console.log("search룸ㅎㅎ", data);
        //dispatch
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const searchHandler = () => {
    searchRoom();
  };

  const searchRoomHandler = (type) => {
    setSearchType(type);
    setSearchRoomModal((prev) => !prev);
  };

  useEffect(() => {
    setList(arrLoop(currentPage));
    // if (currentPage < totalPage) {
    //   const nextPage = currentPage + 1;
    //   queryClient.prefetchQuery(["posts", nextPage], () => axios.get());
    // }
  }, [currentPage, totalPage]);

  return (
    <StWrapper>
      <StRoomListHeader>방 리스트</StRoomListHeader>
      <StSearchRoom>
        <StBtnList>
          <StCheckButton color="#eee">
            <img
              src={
                isWaiting ? ICON.iconCheckBoxChecked : ICON.iconCheckBoxBlank
              }
              width={16}
              onClick={() => setIsWaiting(!isWaiting)}
            />
            <div onClick={() => setIsWaiting(!isWaiting)}>대기방</div>
          </StCheckButton>
          <StCheckButton color="#00831d">
            <img
              src={
                isPrivate ? ICON.iconCheckBoxChecked : ICON.iconCheckBoxBlank
              }
              width={16}
              onClick={() => setIsPrivate(!isPrivate)}
            />
            <div onClick={() => setIsPrivate(!isPrivate)}>비공개</div>
          </StCheckButton>
        </StBtnList>
        <StFuncBack>
          <StModal>
            <StModalOpener
              onClick={() => {
                setSearchRoomModal((prev) => !prev);
              }}
            >
              {}
              <span>{searchType === "number" ? "방 번호" : "방 제목"}</span>
              <img src={ICON.iconDropDown} />
            </StModalOpener>
            <StSearchModal searchRoomModal={searchRoomModal}>
              {["name", "number"].map((el, i) => (
                <button
                  onClick={() => {
                    searchRoomHandler(el);
                  }}
                  key={`StSearchModal${i}`}
                >
                  {el === "number" ? "방 번호" : "방 제목"}
                </button>
              ))}
            </StSearchModal>
          </StModal>
          <StSearchBar>
            <StSearchBarInput
              type="text"
              placeholder="방 제목을 입력해주세요."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img onClick={searchHandler} src={ICON.iconSearch} />
          </StSearchBar>
          <StRefreshBtn>
            <img src={ICON.iconRefresh} alt="새로고침" />
            새로고침
          </StRefreshBtn>
        </StFuncBack>
      </StSearchRoom>
      <StRoomList>
        <RoomContents
          searchType={searchType}
          search={search}
          currentPage={currentPage}
          handleCheckboxChange={handleCheckboxChange}
          isWaiting={isWaiting}
          isPrivate={isPrivate}
          setTotalPage={setTotalPage}
        ></RoomContents>
      </StRoomList>

      <StRoomListBottom>
        <StPagination>
          <StPages>
            <ArrowPageBtn
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage(1);
              }}
              page="1"
              currentPage={currentPage.toString()}
            >
              ≪
            </ArrowPageBtn>
            <ArrowPageBtn
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((previousValue) => previousValue - 1);
              }}
              page="1"
              currentPage={currentPage.toString()}
            >
              ﹤
            </ArrowPageBtn>
            {list.map((el, i) =>
              el === currentPage ? (
                <PageBtn key={i} color="#fff">
                  {el}
                </PageBtn>
              ) : (
                <PageBtn
                  key={i}
                  color="rgba(255, 255, 255, 0.2)"
                  onClick={() => {
                    setCurrentPage(el);
                  }}
                >
                  {el}
                </PageBtn>
              )
            )}
            <ArrowPageBtn
              disabled={currentPage >= totalPage}
              onClick={() => {
                setCurrentPage((previousValue) => previousValue + 1);
              }}
              page={totalPage.toString()}
              currentPage={currentPage.toString()}
            >
              ﹥
            </ArrowPageBtn>
            <ArrowPageBtn
              disabled={currentPage >= totalPage}
              onClick={() => {
                setCurrentPage(totalPage);
              }}
              page={totalPage.toString()}
              currentPage={currentPage.toString()}
            >
              ≫
            </ArrowPageBtn>
          </StPages>
        </StPagination>

        <StButton
          variants={buttonVariants}
          whileHover="hover"
          color="#fff"
          onClick={() => setShowCreateRoom(true)}
        >
          방 만들기
        </StButton>
        {showCreateRoom && (
          <Modal
            modal={showCreateRoom.toString()}
            closeModal={() => {
              setShowCreateRoom(!showCreateRoom);
            }}
            width="440px"
            height="327px"
          >
            <CreateRoom closeModal={setShowCreateRoom} />
          </Modal>
        )}
        <QuickStart>바로시작</QuickStart>
      </StRoomListBottom>
    </StWrapper>
  );
};

export default RoomList;

const StWrapper = styled.div`
  border-radius: 6px;
  border: solid 1px #110;
  width: 650px;
  height: 100%;
`;

const StRoomListHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  border-radius: 5px 5px 0px 0px;
  background: #111111;

  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const StSearchRoom = styled.div`
  height: 44px;
  width: 100%;
  background-color: #4a4a4a;
  padding: 0 22px;
  display: flex;
  align-items: center;
`;

const StRoomList = styled.div`
  width: 100%;
  height: 624px;
  background-color: transparent;
`;

const StRoomListBottom = styled.div`
  height: 72px;
  width: 100%;
  padding: 14px 20px;
  border-radius: 0 0 5px 5px;
  background: #111111;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StBtnList = styled.div`
  display: flex;
`;

const StCheckButton = styled.button`
  width: 64px;
  height: 26px;

  border: 1px solid #000000;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  gap: 2px;
  cursor: pointer;

  & input[type="checkbox"] {
    width: 12px;
    height: 12px;
    border: none;
  }
`;

const StPagination = styled.div`
  width: 330px;
  height: 44px;
  gap: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* color: rgba(255, 255, 255, 0.2); */
  color: #aaaaaa;

  & div {
    cursor: pointer;
  }
`;

const StButton = styled(motion.div)`
  width: 130px;
  height: 44px;
  border-radius: 6px;
  background-color: ${({ color }) => color};

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #000;

  cursor: pointer;
`;

const StFuncBack = styled.div`
  display: flex;
  flex-direction: row;
  height: 26px;
  width: 100%;
  margin-left: 8px;
`;

const StRefreshBtn = styled.button`
  width: 76px;
  height: 26px;
  background: #232323;
  border: 1px solid #000000;
  border-radius: 5px;
  margin-left: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #fff;

  & img {
    margin-right: 2px;
  }
`;

const StPages = styled.div`
  display: flex;
  gap: 3px;
  margin: 0 12px;
  & button {
    width: 25px;
  }
`;

const PageBtn = styled.button`
  border: none;
  background-color: #111;
  font-weight: bold;
  margin: 2.5px;
  color: ${({ color }) => color};
`;

const ArrowPageBtn = styled.button`
  border: none;
  font-size: 12px;
  background-color: #111;
  color: ${({ page, currentPage }) => (currentPage === page ? "gray" : "#fff")};
  cursor: ${({ page, currentPage }) =>
    currentPage === page ? "default" : "pointer"};
`;

const StModal = styled.div`
  width: 85px;
  height: 26px;
`;

const StSearchBar = styled.div`
  width: 284px;
  height: 26px;

  border-radius: 4px;
  border: solid 1px #000;
  background-color: #333;

  color: #888;
  margin-left: 4px;
  display: flex;
  align-items: center;
  & img {
    width: 30px;
    height: 30px;
    padding: 9px;
    cursor: pointer;
  }
`;

const StSearchBarInput = styled.input`
  padding: 0 14px;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  width: 255px;

  color: #fff;
  background-color: #333;
  border: 1px solid #333;
  &:focus {
    outline: none;
  }
`;

const StModalOpener = styled.button`
  background-color: #333;
  border: 1px solid #000000;
  border-radius: 4px;
  padding-left: 12px;
  width: 85px;
  height: 26px;

  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  color: #ffffff;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  & span {
    margin-right: 10px;
  }
`;

const StSearchModal = styled.div`
  display: ${({ searchRoomModal }) => (searchRoomModal ? "flex" : "none")};
  flex-direction: column;
  position: relative;
  z-index: 3;
  & button {
    background-color: #333;
    border: 0.5px solid #000;
    border-radius: 2px;
    padding-left: 12px;
    width: 85px;
    height: 26px;

    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    color: #ffffff;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
