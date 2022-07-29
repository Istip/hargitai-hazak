import { colors } from './tokens';
import styled from 'styled-components';
import { ColorTypes } from '../types/ColorTypes';

interface OwnProps<E extends React.ElementType> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'h1' | 'h2' | 'h3';
  color?: ColorTypes;
  fontWeight?: 'light' | 'normal' | 'bold' | 'black';
  center?: boolean;

  children: React.ReactNode;
  as?: E;
}

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps<E>>;

const Text = <E extends React.ElementType = 'div'>({
  size,
  color,
  center,
  fontWeight,
  children,
  as,
  props,
}: Props<E>) => {
  const handleFontSize = (fontSize: string) => {
    switch (fontSize) {
      case 'xs':
        return '0.75rem';
      case 'sm':
        return '0.875rem';
      case 'md':
        return '1rem';
      case 'lg':
        return '1.125rem';
      case 'xl':
        return '1.25rem';
      case 'h1':
        return '2.25rem';
      case 'h2':
        return '1.5rem';
      case 'h3':
        return '1.25rem';
      default:
        return '1rem';
    }
  };

  const handleFontWeight = (fontWeight: string) => {
    switch (fontWeight) {
      case 'light':
        return '300';
      case 'normal':
        return '400';
      case 'bold':
        return '700';
      case 'black':
        return '900';
      default:
        return '400';
    }
  };

  const Component = as || 'div';

  const Wrapper = styled(Component)`
    text-align: ${center && 'center'};
    font-size: ${handleFontSize(size || 'md')};
    font-weight: ${handleFontWeight(fontWeight || 'normal')};
    color: ${colors[color || 'black']};
    letter-spacing: -0.5px;
  `;

  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Text;
