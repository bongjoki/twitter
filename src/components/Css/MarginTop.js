import React from 'react';
import styledComponents from 'styled-components';

const MarginTopContainer = styledComponents.div`
  margin-top: ${props => `${props.value}px;`};
`;

const MarginTop = ({ value }) => {
  return <MarginTopContainer value={value} />;
};

export default MarginTop;
