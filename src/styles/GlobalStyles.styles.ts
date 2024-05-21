import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  .app {
    display: flex;
  }
  .app__container{
    flex:1;
  }
  a {
    text-decoration:none;
    color:#000
  }
`;
export default GlobalStyles