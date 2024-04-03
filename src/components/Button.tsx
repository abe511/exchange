import { PropsWithChildren } from "react";

const Button: React.FC<PropsWithChildren> = ({ children, ...props }) => {

  return (
    <button {...props} >{children}</button>
  );
};


export default Button;