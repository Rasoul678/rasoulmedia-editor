import React from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";

interface IProps extends React.DOMAttributes<SVGElement> {}

export const Up: React.FC<IProps> = (props) => {
  return <BsArrowUpSquareFill size={20} title='move up' color='orange' {...props} />;
};
