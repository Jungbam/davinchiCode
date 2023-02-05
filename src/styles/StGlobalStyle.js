import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

const StGlobalStyle = createGlobalStyle`
  ${normalize}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;  
    font-family: Roboto, Arial ,sans-serif;   
  }

  body {
    background-image: url('/images/background.png');
  background-size: cover;
  height: 100vh;
  background-color: #2b2b2b;
  }

  button{
    cursor:pointer;
  }
  .App {
    position: relative;
    width: 100%;
  }
`;

export default StGlobalStyle;
