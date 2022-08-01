import styled from 'styled-components';
import { AlignItems } from '../types/AlignItems';
import { ColorTypes } from '../types/ColorTypes';
import { JustifyContent } from '../types/JustifyContent';
import { colors } from './tokens';

interface Props
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  children: React.ReactNode;

  w?: number | string;
  h?: number | string;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  gap?: number;
  direction?: 'row' | 'column';
  p?: number | string;
  m?: number | string;
  bg?: ColorTypes;
  borderColor?: ColorTypes;
}

const Flex: React.FC<Props> = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Flex;

const Container = styled.div<Omit<Props, 'children'>>`
  width: ${({ w }) => (typeof w === 'number' ? `${w}px` : `${w}`)};
  height: ${({ h }) => (typeof h === 'number' ? `${h}px` : `${h}`)};
  padding: ${({ p }) => (typeof p === 'number' ? `${p}px` : `${p}`)};
  margin: ${({ m }) => (typeof m === 'number' ? `${m}px` : `${m}`)};
  flex-direction: ${({ direction }) => direction};
  display: flex;
  gap: ${({ gap }) => `${gap}px`};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  background: ${({ bg }) => (bg ? colors[bg] : 'transparent')};
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${colors[borderColor]}` : 'none'};
`;
