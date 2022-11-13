import React from "react";
import { BsFillXSquareFill } from "react-icons/bs";

interface IProps extends React.DOMAttributes<SVGElement> {}

export const Delete: React.FC<IProps> = (props) => {
  return <BsFillXSquareFill size={20} title='delete' color="crimson" {...props} />;
};
