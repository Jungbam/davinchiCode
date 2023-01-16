const mockData = {
  maxPage: 5,
  rooms: [
    {
      currentMembers: 4,
      maxMembers: 4,
      isWaiting: false,
      roomId: 101,
      roomName: "그냥 아무나 환영한다",
      isPrivate: true,
    },
    {
      currentMembers: 2,
      maxMembers: 4,
      isWaiting: true,
      roomId: 102,
      roomName: "이길수 없을거야 아마두",
      isPrivate: false,
    },
    {
      currentMembers: 1,
      maxMembers: 4,
      isWaiting: false,
      roomId: 103,
      roomName: "지면 100대 맞는거다",
      isPrivate: true,
    },
    {
      currentMembers: 4,
      maxMembers: 4,
      isWaiting: true,
      roomId: 104,
      roomName: "초보자던 고수던 아무나 다 와바",
      isPrivate: false,
    },
    {
      currentMembers: 2,
      maxMembers: 4,
      isWaiting: false,
      roomId: 105,
      roomName: "즐갬하실분만 아무나 환영한다",
      isPrivate: true,
    },
  ],
};

export default mockData;
