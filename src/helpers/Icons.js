import React from "react";
import iconRefresh from "../assets/icons/ico_refresh.svg";
import iconTimer from "../assets/icons/ico_timer.svg";
import iconSend from "../assets/icons/ico_send.svg";
import iconAlert from "../assets/icons/info-circle.svg";
import iconUnlock from "../assets/icons/ico_lobby_unlock.svg";
import iconLock from "../assets/icons/ico_lobby_lock.svg";
import iconDropDown from "../assets/icons/arrow_dropdown.svg";
import iconSearch from "../assets/icons/ico_search.svg";
import iconCheckBoxBlank from "../assets/icons/check_box_blank.svg";
import iconCheckBoxChecked from "../assets/icons/check_box_checked.svg";
import iconLobbyLogo from "../assets/icons/logo.png";
import iconLockHeader from "../assets/icons/ico_lock_white.svg";
import iconSirenHeader from "../assets/icons/ico_siren_white.svg";
import arrowLeft from "../assets/icons/arrow_left.svg";
import arrowLeftx2 from "../assets/icons/arrow_left_x2.svg";
import arrowRight from "../assets/icons/arrow_right.svg";
import arrowRightx2 from "../assets/icons/arrow_right_x2.svg";
import arrowLeftDark from "../assets/icons/arrow_left_dark.svg";
import arrowLeftx2Dark from "../assets/icons/arrow_left_x2_dark.svg";
import arrowRightDark from "../assets/icons/arrow_right_dark.svg";
import arrowRightx2Dark from "../assets/icons/arrow_right_x2_dark.svg";

import RankOne from "../assets/images/rank/rankone.png";
import RankSecond from "../assets/images/rank/ranksecond.png";
import RankThird from "../assets/images/rank/rankthird.png";
import RankForth from "../assets/images/rank/rankfourth.png";
import RankGameOver from "../assets/images/rank/gameover.png";

const xlblackBack = React.lazy(
  import("../assets/icons/tiles/xl/back_black.png")
);
const xlblack0 = React.lazy(import("../assets/icons/tiles/xl/0_black.png"));
const xlblack1 = React.lazy(import("../assets/icons/tiles/xl/1_black.png"));
const xlblack2 = React.lazy(import("../assets/icons/tiles/xl/2_black.png"));
const xlblack3 = React.lazy(import("../assets/icons/tiles/xl/3_black.png"));
const xlblack4 = React.lazy(import("../assets/icons/tiles/xl/4_black.png"));
const xlblack5 = React.lazy(import("../assets/icons/tiles/xl/5_black.png"));
const xlblack6 = React.lazy(import("../assets/icons/tiles/xl/6_black.png"));
const xlblack7 = React.lazy(import("../assets/icons/tiles/xl/7_black.png"));
const xlblack8 = React.lazy(import("../assets/icons/tiles/xl/8_black.png"));
const xlblack9 = React.lazy(import("../assets/icons/tiles/xl/9_black.png"));
const xlblack10 = React.lazy(import("../assets/icons/tiles/xl/10_black.png"));
const xlblack11 = React.lazy(import("../assets/icons/tiles/xl/11_black.png"));
const xlblack12 = React.lazy(
  import("../assets/icons/tiles/xl/joker_black.png")
);

const xlwhiteBack = React.lazy(
  import("../assets/icons/tiles/xl/back_white.png")
);
const xlwhite0 = React.lazy(import("../assets/icons/tiles/xl/0_white.png"));
const xlwhite1 = React.lazy(import("../assets/icons/tiles/xl/1_white.png"));
const xlwhite2 = React.lazy(import("../assets/icons/tiles/xl/2_white.png"));
const xlwhite3 = React.lazy(import("../assets/icons/tiles/xl/3_white.png"));
const xlwhite4 = React.lazy(import("../assets/icons/tiles/xl/4_white.png"));
const xlwhite5 = React.lazy(import("../assets/icons/tiles/xl/5_white.png"));
const xlwhite6 = React.lazy(import("../assets/icons/tiles/xl/6_white.png"));
const xlwhite7 = React.lazy(import("../assets/icons/tiles/xl/7_white.png"));
const xlwhite8 = React.lazy(import("../assets/icons/tiles/xl/8_white.png"));
const xlwhite9 = React.lazy(import("../assets/icons/tiles/xl/9_white.png"));
const xlwhite10 = React.lazy(import("../assets/icons/tiles/xl/10_white.png"));
const xlwhite11 = React.lazy(import("../assets/icons/tiles/xl/11_white.png"));
const xlwhite12 = React.lazy(
  import("../assets/icons/tiles/xl/joker_white.png")
);

const smblackBack = React.lazy(import("../assets/icons/tiles/sm/b_back.png"));
const smblack0 = React.lazy(import("../assets/icons/tiles/sm/b_0.png"));
const smblack1 = React.lazy(import("../assets/icons/tiles/sm/b_1.png"));
const smblack2 = React.lazy(import("../assets/icons/tiles/sm/b_2.png"));
const smblack3 = React.lazy(import("../assets/icons/tiles/sm/b_3.png"));
const smblack4 = React.lazy(import("../assets/icons/tiles/sm/b_4.png"));
const smblack5 = React.lazy(import("../assets/icons/tiles/sm/b_5.png"));
const smblack6 = React.lazy(import("../assets/icons/tiles/sm/b_6.png"));
const smblack7 = React.lazy(import("../assets/icons/tiles/sm/b_7.png"));
const smblack8 = React.lazy(import("../assets/icons/tiles/sm/b_8.png"));
const smblack9 = React.lazy(import("../assets/icons/tiles/sm/b_9.png"));
const smblack10 = React.lazy(import("../assets/icons/tiles/sm/b_10.png"));
const smblack11 = React.lazy(import("../assets/icons/tiles/sm/b_11.png"));
const smblack12 = React.lazy(import("../assets/icons/tiles/sm/b_joker.png"));

const smwhiteBack = React.lazy(import("../assets/icons/tiles/sm/w_back.png"));
const smwhite0 = React.lazy(import("../assets/icons/tiles/sm/w_0.png"));
const smwhite1 = React.lazy(import("../assets/icons/tiles/sm/w_1.png"));
const smwhite2 = React.lazy(import("../assets/icons/tiles/sm/w_2.png"));
const smwhite3 = React.lazy(import("../assets/icons/tiles/sm/w_3.png"));
const smwhite4 = React.lazy(import("../assets/icons/tiles/sm/w_4.png"));
const smwhite5 = React.lazy(import("../assets/icons/tiles/sm/w_5.png"));
const smwhite6 = React.lazy(import("../assets/icons/tiles/sm/w_6.png"));
const smwhite7 = React.lazy(import("../assets/icons/tiles/sm/w_7.png"));
const smwhite8 = React.lazy(import("../assets/icons/tiles/sm/w_8.png"));
const smwhite9 = React.lazy(import("../assets/icons/tiles/sm/w_9.png"));
const smwhite10 = React.lazy(import("../assets/icons/tiles/sm/w_10.png"));
const smwhite11 = React.lazy(import("../assets/icons/tiles/sm/w_11.png"));
const smwhite12 = React.lazy(import("../assets/icons/tiles/sm/w_joker.png"));

const mdblackBack = React.lazy(import("../assets/icons/tiles/md/b_back.png"));
const mdblack0 = React.lazy(import("../assets/icons/tiles/md/b_0.png"));
const mdblack1 = React.lazy(import("../assets/icons/tiles/md/b_1.png"));
const mdblack2 = React.lazy(import("../assets/icons/tiles/md/b_2.png"));
const mdblack3 = React.lazy(import("../assets/icons/tiles/md/b_3.png"));
const mdblack4 = React.lazy(import("../assets/icons/tiles/md/b_4.png"));
const mdblack5 = React.lazy(import("../assets/icons/tiles/md/b_5.png"));
const mdblack6 = React.lazy(import("../assets/icons/tiles/md/b_6.png"));
const mdblack7 = React.lazy(import("../assets/icons/tiles/md/b_7.png"));
const mdblack8 = React.lazy(import("../assets/icons/tiles/md/b_8.png"));
const mdblack9 = React.lazy(import("../assets/icons/tiles/md/b_9.png"));
const mdblack10 = React.lazy(import("../assets/icons/tiles/md/b_10.png"));
const mdblack11 = React.lazy(import("../assets/icons/tiles/md/b_11.png"));
const mdblack12 = React.lazy(import("../assets/icons/tiles/md/b_joker.png"));

const mdwhiteBack = React.lazy(import("../assets/icons/tiles/md/w_back.png"));
const mdwhite0 = React.lazy(import("../assets/icons/tiles/md/w_0.png"));
const mdwhite1 = React.lazy(import("../assets/icons/tiles/md/w_1.png"));
const mdwhite2 = React.lazy(import("../assets/icons/tiles/md/w_2.png"));
const mdwhite3 = React.lazy(import("../assets/icons/tiles/md/w_3.png"));
const mdwhite4 = React.lazy(import("../assets/icons/tiles/md/w_4.png"));
const mdwhite5 = React.lazy(import("../assets/icons/tiles/md/w_5.png"));
const mdwhite6 = React.lazy(import("../assets/icons/tiles/md/w_6.png"));
const mdwhite7 = React.lazy(import("../assets/icons/tiles/md/w_7.png"));
const mdwhite8 = React.lazy(import("../assets/icons/tiles/md/w_8.png"));
const mdwhite9 = React.lazy(import("../assets/icons/tiles/md/w_9.png"));
const mdwhite10 = React.lazy(import("../assets/icons/tiles/md/w_10.png"));
const mdwhite11 = React.lazy(import("../assets/icons/tiles/md/w_11.png"));
const mdwhite12 = React.lazy(import("../assets/icons/tiles/md/w_joker.png"));

const lgblackBack = React.lazy(import("../assets/icons/tiles/lg/b_back.png"));
const lgblack0 = React.lazy(import("../assets/icons/tiles/lg/b_0.png"));
const lgblack1 = React.lazy(import("../assets/icons/tiles/lg/b_1.png"));
const lgblack2 = React.lazy(import("../assets/icons/tiles/lg/b_2.png"));
const lgblack3 = React.lazy(import("../assets/icons/tiles/lg/b_3.png"));
const lgblack4 = React.lazy(import("../assets/icons/tiles/lg/b_4.png"));
const lgblack5 = React.lazy(import("../assets/icons/tiles/lg/b_5.png"));
const lgblack6 = React.lazy(import("../assets/icons/tiles/lg/b_6.png"));
const lgblack7 = React.lazy(import("../assets/icons/tiles/lg/b_7.png"));
const lgblack8 = React.lazy(import("../assets/icons/tiles/lg/b_8.png"));
const lgblack9 = React.lazy(import("../assets/icons/tiles/lg/b_9.png"));
const lgblack10 = React.lazy(import("../assets/icons/tiles/lg/b_10.png"));
const lgblack11 = React.lazy(import("../assets/icons/tiles/lg/b_11.png"));
const lgblack12 = React.lazy(import("../assets/icons/tiles/lg/b_joker.png"));

const lgwhiteBack = React.lazy(import("../assets/icons/tiles/lg/w_back.png"));
const lgwhite0 = React.lazy(import("../assets/icons/tiles/lg/w_0.png"));
const lgwhite1 = React.lazy(import("../assets/icons/tiles/lg/w_1.png"));
const lgwhite2 = React.lazy(import("../assets/icons/tiles/lg/w_2.png"));
const lgwhite3 = React.lazy(import("../assets/icons/tiles/lg/w_3.png"));
const lgwhite4 = React.lazy(import("../assets/icons/tiles/lg/w_4.png"));
const lgwhite5 = React.lazy(import("../assets/icons/tiles/lg/w_5.png"));
const lgwhite6 = React.lazy(import("../assets/icons/tiles/lg/w_6.png"));
const lgwhite7 = React.lazy(import("../assets/icons/tiles/lg/w_7.png"));
const lgwhite8 = React.lazy(import("../assets/icons/tiles/lg/w_8.png"));
const lgwhite9 = React.lazy(import("../assets/icons/tiles/lg/w_9.png"));
const lgwhite10 = React.lazy(import("../assets/icons/tiles/lg/w_10.png"));
const lgwhite11 = React.lazy(import("../assets/icons/tiles/lg/w_11.png"));
const lgwhite12 = React.lazy(import("../assets/icons/tiles/lg/w_joker.png"));

export const ICON = {
  iconTimer,
  iconSend,
  arrowLeft,
  arrowLeftx2,
  arrowRight,
  arrowRightx2,
  arrowLeftDark,
  arrowLeftx2Dark,
  arrowRightDark,
  arrowRightx2Dark,

  RankOne,
  RankSecond,
  RankThird,
  RankForth,
  RankGameOver,
  iconAlert,
  iconUnlock,
  iconLock,
  iconRefresh,
  iconDropDown,
  iconSearch,
  iconCheckBoxChecked,
  iconCheckBoxBlank,
  iconLobbyLogo,
  iconLockHeader,
  iconSirenHeader,

  smblackBack,
  smblack0,
  smblack1,
  smblack2,
  smblack3,
  smblack4,
  smblack5,
  smblack6,
  smblack7,
  smblack8,
  smblack9,
  smblack10,
  smblack11,
  smblack12,
  smwhiteBack,
  smwhite0,
  smwhite1,
  smwhite2,
  smwhite3,
  smwhite4,
  smwhite5,
  smwhite6,
  smwhite7,
  smwhite8,
  smwhite9,
  smwhite10,
  smwhite11,
  smwhite12,

  mdblackBack,
  mdblack0,
  mdblack1,
  mdblack2,
  mdblack3,
  mdblack4,
  mdblack5,
  mdblack6,
  mdblack7,
  mdblack8,
  mdblack9,
  mdblack10,
  mdblack11,
  mdblack12,
  mdwhiteBack,
  mdwhite0,
  mdwhite1,
  mdwhite2,
  mdwhite3,
  mdwhite4,
  mdwhite5,
  mdwhite6,
  mdwhite7,
  mdwhite8,
  mdwhite9,
  mdwhite10,
  mdwhite11,
  mdwhite12,

  lgblackBack,
  lgblack0,
  lgblack1,
  lgblack2,
  lgblack3,
  lgblack4,
  lgblack5,
  lgblack6,
  lgblack7,
  lgblack8,
  lgblack9,
  lgblack10,
  lgblack11,
  lgblack12,
  lgwhiteBack,
  lgwhite0,
  lgwhite1,
  lgwhite2,
  lgwhite3,
  lgwhite4,
  lgwhite5,
  lgwhite6,
  lgwhite7,
  lgwhite8,
  lgwhite9,
  lgwhite10,
  lgwhite11,
  lgwhite12,

  xlblackBack,
  xlblack0,
  xlblack1,
  xlblack2,
  xlblack3,
  xlblack4,
  xlblack5,
  xlblack6,
  xlblack7,
  xlblack8,
  xlblack9,
  xlblack10,
  xlblack11,
  xlblack12,
  xlwhiteBack,
  xlwhite0,
  xlwhite1,
  xlwhite2,
  xlwhite3,
  xlwhite4,
  xlwhite5,
  xlwhite6,
  xlwhite7,
  xlwhite8,
  xlwhite9,
  xlwhite10,
  xlwhite11,
  xlwhite12,
};
