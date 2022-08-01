import styled from 'styled-components';
import { ColorTypes } from '../types/ColorTypes';
import { colors } from './tokens';

interface Props
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'small' | 'medium' | 'large';
  bg?: ColorTypes;
  variant?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
  icon?: JSX.Element;
  w?: number | string;
  justifyContent?: 'left' | 'right' | 'center';
}

const Button: React.FC<Props> = (
  { children, size, bg, variant, icon, onClick, w, justifyContent },
  props
) => {
  return (
    <ButtonWrapper {...props}>
      <ButtonContent
        onClick={onClick}
        size={size}
        justifyContent={justifyContent}
        bg={bg}
        className={variant}
        w={w}
        {...props}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {children}
      </ButtonContent>
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.div``;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const ButtonContent = styled.button<Props>`
  width: ${({ w }) => (typeof w === 'number' ? `${w}px` : `${w}`)};
  display: flex;
  text-align: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ size }) =>
    size === 'small'
      ? '10px 20px'
      : size === 'medium'
      ? '20px 20px'
      : size === 'large'
      ? '30px 20px'
      : '10px 20px'};
  background: ${({ bg }) => (bg ? colors[bg] : 'transparent')};
  border: 1px solid;
  cursor: pointer;
  font-weight: 700;
  transition: 250ms ease;

  &.primary {
    background: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.white};

    &:hover {
      background: ${colors.primary600};
      border-color: ${colors.primary600};
    }

    &:active {
      background: ${colors.primary400};
      border-color: ${colors.primary400};
    }
  }

  &.secondary {
    background: ${colors.primary100};
    border-color: ${colors.primary};
    color: ${colors.primary};

    &:hover {
      background: ${colors.primary200};
      color: ${colors.primary500};
      border-color: ${colors.primary400};
    }

    &:active {
      background: ${colors.primary400};
      border-color: ${colors.primary400};
      color: ${colors.primary100};
    }
  }

  &.error {
    background: ${colors.error}95;
    border-color: ${colors.error};
    color: ${colors.white};

    &:hover {
      background: ${colors.error}75;
    }
  }

  &.success {
    background: ${colors.success}95;
    border-color: ${colors.success};
    color: ${colors.black};

    &:hover {
      background: ${colors.success}75;
    }
  }

  &.warning {
    background: ${colors.warning}95;
    border-color: ${colors.warning};
    color: ${colors.black};

    &:hover {
      background: ${colors.warning}75;
    }
  }
`;
