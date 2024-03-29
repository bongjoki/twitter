import React from 'react';
import styled from 'styled-components';
import { colorBlack } from './Css/Colors';
import Spinner from './Spinner';

const StyledLoading = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorBlack};
  opacity: 0.3;
`;
const Loading = () => {
  return (
    <StyledLoading>
      <Spinner />
    </StyledLoading>
  );
};

export default Loading;
