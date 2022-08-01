import styled from 'styled-components';
import { colors } from './tokens';

interface Props
  extends React.PropsWithChildren<
    React.InputHTMLAttributes<HTMLInputElement>
  > {}

const Input: React.FC<Props> = (props) => {
  return <InputField {...props} />;
};

export default Input;

const InputField = styled.input<Props>`
  padding: 12px 18px;
  border: 1px solid ${colors.primary200};
  background: ${colors.white};
  width: 100%;
  outline: 0;

  &:focus {
    border: 1px solid ${colors.primary400};
    outline: 3px solid ${colors.primary400};
  }
`;
