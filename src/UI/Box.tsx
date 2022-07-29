import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  p?: number | string;
  m?: number | string;
}

const Box: React.FC<Props> = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Box;

interface ContainerProps {
  p?: number | string;
  m?: number | string;
}
const Container = styled.div<ContainerProps>`
  border: 1px solid red;
  padding: ${({ p }) => (typeof p === 'number' ? `${p}px` : `${p}`)};
  margin: ${({ m }) => (typeof m === 'number' ? `${m}px` : `${m}`)};
`;
