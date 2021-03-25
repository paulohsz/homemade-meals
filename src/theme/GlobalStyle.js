import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

// CSS Reset
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  ${normalize}
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.colors.background.main};
  }
  /* Full height layout */
  html, body {
    display: flex;
    min-height: 100%;
    width: 100%;
  }
  #__next {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }
`;

export default GlobalStyle;
