import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import GlobalStyle from 'components/GlobalStyle';

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
