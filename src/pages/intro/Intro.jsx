import React from 'react'
export const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=http://localhost:3000/kakao&response_type=code`;
const Intro = () => {
  return (
    <div><a href={KAKAO_URL}>카카오 로그인</a></div>
  )
}

export default Intro