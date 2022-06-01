import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  // Reset CSS
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    background: #000000;
    max-width: 500px;
    min-height: 100vh;
    margin: 0 auto;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
`;

export default GlobalStyle;
