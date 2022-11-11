import React, { memo, useEffect, useId, useRef } from "react";
import { IFRAME_SRCDOC } from "../../constant";

interface IProps {
  code: string;
}

const Preview: React.FC<IProps> = ({ code }) => {
  const id = useId();
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    ref.current!.srcdoc = IFRAME_SRCDOC;

    //* Because it takes time to sets iframe's srcDoc,
    //* we must wait a litle and then post a message!!
    setTimeout(() => {
      ref.current!.contentWindow!.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <iframe
      ref={ref}
      title={`preview-${id}`}
      sandbox="allow-scripts"
      srcDoc={IFRAME_SRCDOC}
      style={{ width: "100%", backgroundColor: "white" }}
    />
  );
};

export default memo(Preview);
