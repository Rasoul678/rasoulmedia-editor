import React from "react";
import { BsPlusLg } from "react-icons/bs";

interface IProps extends React.DOMAttributes<SVGElement> {}

const Plus: React.FC<IProps> = (props) => {
  return <BsPlusLg size={16} style={{margin: '0 0.3rem'}} title="format code" {...props} />;
};

export default Plus;
