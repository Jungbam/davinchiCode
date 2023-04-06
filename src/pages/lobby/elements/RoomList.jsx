import styled from "styled-components";
import RoomContents from "./roomListDetail/RoomContents";
import { useState } from "react";
import { motion } from "framer-motion";
import QuickStart from "./roomListDetail/RoomQuickStart";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CreateRoom from "../../../components/form/sign/CreateRoom";
import { ICON } from "../../../helpers/Icons";
import { RoomAPI } from "../../../api/axios";
import Moddal from "../../../components/form/modal/Moddal";
import { queryKeys } from "../../../helpers/queryKeys";
import { Variants } from "../../../helpers/Variants";
import { useError } from "../../../hooks/useError";

const RoomList = () => {
  const [search, setSearch] = useState("");
  const [roomsData, setRoomsData] = useState([]);
  const errorHandler = useError();
  const [searchRoomModal, setSearchRoomModal] = useState(null);
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
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

  const { status, refetch: searchRoom } = useQuery(
    [queryKeys.ROOM_LIST, currentPage],
    () =>
      RoomAPI.searchRoom({
        currentPage,
        search,
        searchType,
        is_waiting: isWaiting ? isWaiting.toString() : "",
        is_public: isPrivate ? isPrivate.toString() : "",
      }),
    {
      keepPreviousData: true,
      onSuccess: ({ data }) => {
        setTotalPage(data.totalPage);
        setRoomsData(data.rooms);
      },
      onError: (error) => {
        errorHandler(error);
      },
      refetchInterval: 2000,
    }
  );

  const searchHandler = () => {
    searchRoom();
  };

  const searchRoomHandler = (type) => {
    setSearchType(type);
    setSearchRoomModal((prev) => !prev);
  };

  const searchByEnter = (e) => {
    if (e.keyCode === 13) {
      searchRoom();
    }
  };

  useEffect(() => {
    setList(arrLoop(currentPage));
  }, [currentPage, totalPage, search]);

  useEffect(() => {
    searchRoom();
  }, [isWaiting, isPrivate]);

  return (
    <StWrapper>
      <StRoomListHeader>방 리스트</StRoomListHeader>
      <StSearchRoom>
        <StBtnList>
          <StCheckButton color="#eee" onClick={() => setIsWaiting(!isWaiting)}>
            <img
              src={
                isWaiting ? ICON.iconCheckBoxChecked : ICON.iconCheckBoxBlank
              }
              width={16}
              alt="진행여부"
            />
            <div>대기</div>
          </StCheckButton>
          <StCheckButton
            color="#00831d"
            onClick={() => setIsPrivate(!isPrivate)}
          >
            <img
              src={
                isPrivate ? ICON.iconCheckBoxChecked : ICON.iconCheckBoxBlank
              }
              width={16}
              alt="체크박스"
            />
            <div>공개</div>
          </StCheckButton>
        </StBtnList>
        <StFuncBack>
          <StModal>
            <StModalOpener
              onClick={() => {
                setSearchRoomModal((prev) => !prev);
              }}
            >
              <span>{searchType === "number" ? "방 번호" : "방 제목"}</span>
              <img src={ICON.iconDropDown} alt="드롭다운" />
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
              onKeyDown={searchByEnter}
            />
            <img onClick={searchHandler} src={ICON.iconSearch} alt="검색" />
          </StSearchBar>
          <StRefreshBtn
            onClick={() => {
              searchRoom();
            }}
          >
            <img src={ICON.iconRefresh} alt="새로고침" />
            새로고침
          </StRefreshBtn>
        </StFuncBack>
      </StSearchRoom>
      <StRoomList>
        <RoomContents
          roomsData={roomsData}
          status={status}
          isWaiting={isWaiting}
          isPrivate={isPrivate}
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
              <img
                src={
                  currentPage === 1 ? ICON.arrowLeftx2Dark : ICON.arrowLeftx2
                }
                alt="처음 페이지"
              />
            </ArrowPageBtn>
            <ArrowPageBtn
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((previousValue) => previousValue - 1);
              }}
              page="1"
              currentPage={currentPage.toString()}
            >
              <img
                src={currentPage === 1 ? ICON.arrowLeftDark : ICON.arrowLeft}
                alt="이전 페이지"
              />
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
              <img
                src={
                  currentPage === totalPage
                    ? ICON.arrowRightDark
                    : ICON.arrowRight
                }
                alt="다음 페이지"
              />
            </ArrowPageBtn>
            <ArrowPageBtn
              disabled={currentPage >= totalPage}
              onClick={() => {
                setCurrentPage(totalPage);
              }}
              page={totalPage.toString()}
              currentPage={currentPage.toString()}
            >
              <img
                src={
                  currentPage === totalPage
                    ? ICON.arrowRightx2Dark
                    : ICON.arrowRightx2
                }
                alt="마지막 페이지"
              />
            </ArrowPageBtn>
          </StPages>
        </StPagination>

        <StButton
          variants={Variants.buttonReverse}
          whileHover="hover"
          color="#fff"
          onClick={() => setShowCreateRoom(true)}
        >
          방 만들기
        </StButton>
        {showCreateRoom && (
          <Moddal
            modal={showCreateRoom.toString()}
            closeModal={() => {
              setShowCreateRoom((prev) => !prev);
            }}
            width="440px"
            height="327px"
          >
            <CreateRoom closeModal={() => setShowCreateRoom((prev) => !prev)} />
          </Moddal>
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
  background-color: rgb(48, 48, 48, 0.5);
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
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ page, currentPage }) => (currentPage === page ? "gray" : "#fff")};
  cursor: ${({ page, currentPage }) =>
    currentPage === page ? "default" : "pointer"};
`;

const StModal = styled.div`
  width: 85px;
  height: 26px;
`;

const StSearchBar = styled.div`
  position: relative;
  width: 284px;
  height: 26px;

  border-radius: 4px;
  border: none;
  background-color: #333;

  color: #888;
  margin-left: 4px;
  display: flex;
  align-items: center;
  & img {
    position: absolute;
    right: 0;

    width: 30px;
    height: 30px;
    padding: 9px;
    cursor: pointer;
  }
`;

const StSearchBarInput = styled.input`
  padding: 0 22px 0 14px;
  width: 100%;
  height: 100%;
  border-radius: 4px;

  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;

  color: #fff;
  background-color: #333;
  border: 1px solid #000;
  &:focus {
    outline: none;
    border: 1px solid #fff;
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
  justify-content: space-between;
  align-items: center;
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
