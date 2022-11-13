import React from "react";
import { SiPrettier } from "react-icons/si";

interface IProps extends React.DOMAttributes<SVGElement> {}

const Prettier: React.FC<IProps> = (props) => {
  return <SiPrettier fill="orange" size={20} title="format code" {...props} />;
};

export default Prettier;
