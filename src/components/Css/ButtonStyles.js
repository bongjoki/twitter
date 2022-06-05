import { css } from 'styled-components';
import { FontSizeBody3 } from './FontSize';
import { colorBlack } from './Colors';

export const buttonStyle1 = css`
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
  padding: 10px 0;
  border-radius: 24px;
  border: none;
  display: flex;
  justify-content: center;
  font-size: ${FontSizeBody3};
  color: ${colorBlack};
  font-weight: 600;
`;
