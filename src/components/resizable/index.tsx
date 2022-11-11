import React, { PropsWithChildren } from "react";
import { Resizable } from "re-resizable";
import Handle from "./Handle";

interface IProps extends PropsWithChildren {
  direction: "horizontal" | "vertical";
  width?: string | number;
  maxWidth?: string | number;
}

const ResizableBox: React.FC<IProps> = (props) => {
  const { direction, children, width = "100%", maxWidth = "100%" } = props;

  return (
    <Resizable
      defaultSize={{
        width,
        height: "auto",
      }}
      minWidth="30%"
      maxWidth={maxWidth}
      handleComponent={{
        right: <Handle direction="vertical" />,
        bottom: <Handle direction="horizontal" />,
      }}
      enable={{
        ...(direction === "horizontal" ? { right: true } : { bottom: true }),
      }}
      minHeight="10vh"
      maxHeight="80vh"
    >
      {children}
    </Resizable>
  );
};

export default ResizableBox;
