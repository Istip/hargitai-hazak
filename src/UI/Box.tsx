import React from 'react';
import styled from 'styled-components';
import { ColorTypes } from '../types/ColorTypes';
import { colors } from './tokens';

interface Props {
  children: React.ReactNode;
  p?: number | string;
  m?: number | string;
  bg?: ColorTypes;
  borderColor?: ColorTypes;
  bt?: number | string;
}

const Box: React.FC<Props> = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Box;

const Container = styled.div<Omit<Props, 'children'>>`
  padding: ${({ p }) => (typeof p === 'number' ? `${p}px` : `${p}`)};
  margin: ${({ m }) => (typeof m === 'number' ? `${m}px` : `${m}`)};
  background: ${({ bg }) => (bg ? colors[bg] : 'transparent')};
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${colors[borderColor]}` : 'none'};
`;
