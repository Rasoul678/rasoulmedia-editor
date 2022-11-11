import React, { memo, useEffect, useId, useRef } from "react";
import { IFRAME_SRCDOC } from "../../constant";
import style from "./preview.module.css";

interface IProps {
  preview: {
    code: string;
    err: string;
  };
}

const Preview: React.FC<IProps> = (props) => {
  const { code, err } = props.preview;
  const id = useId();
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (err) return;

    ref.current!.srcdoc = IFRAME_SRCDOC;

    //* Because it takes time to sets iframe's srcDoc,
    //* we must wait a litle and then post a message!!
    setTimeout(() => {
      ref.current!.contentWindow!.postMessage(code, "*");
    }, 50);
  }, [code, err]);

  if (err) {
    return (
      <div className={style.preview__error}>
        <b>Compile Error:</b> <br /> {err}
      </div>
    );
  }

  return (
    <iframe
      ref={ref}
      title={`preview-${id}`}
      sandbox="allow-scripts"
      srcDoc={IFRAME_SRCDOC}
      className={style.preview__iframe}
    />
  );
};

export default memo(Preview);
