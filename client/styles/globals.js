import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const Global = createGlobalStyle`
  ${normalize};
  *, 
  *::before,
  *::after {
    margin: 0;
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  
`;

export default Global;
