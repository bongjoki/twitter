import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    color: #ffffff;
  }

  body {
    background: #000000;
    max-width: 500px;
    min-height: 100vh;
    margin: 0 auto;
    color: #ffffff;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  input,
  button {
    background: transparent;
    border: none;
  }

  textarea {
    border: none;
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none;
  }

  path {
    color: inherit;
  }
  
`;

export default GlobalStyle;
