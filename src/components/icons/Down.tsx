import React from "react";
import { BsArrowDownSquareFill } from "react-icons/bs";

interface IProps extends React.DOMAttributes<SVGElement> {}

export const Down: React.FC<IProps> = (props) => {
  return <BsArrowDownSquareFill size={20} title='move down' color="orange" {...props} />;
};
