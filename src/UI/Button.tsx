import React from 'react';

interface Props
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {}

const Button: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Button;
