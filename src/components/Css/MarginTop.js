import React from 'react';
import styled from 'styled-components';

const MarginTopContainer = styled.div`
  margin-top: ${props => `${props.value}px;`};
`;

const MarginTop = ({ value }) => {
  return <MarginTopContainer value={value} />;
};

export default MarginTop;
