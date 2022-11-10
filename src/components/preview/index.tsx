import React, { memo, useEffect, useId, useRef } from "react";
import previewStyle from "./preview.module.css";

interface IProps {
  code: string;
}

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MeBox</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener("message", (event) => {
        try{
          eval(event.data);
        } catch(error){
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: crimson;"><h4>Runtime Error:</h4>' + error + '</div>';
          console.error(error);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<IProps> = ({ code }) => {
  const id = useId();
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    ref.current!.srcdoc = html;
    ref.current!.contentWindow!.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      className={previewStyle.iframe}
      ref={ref}
      title={`preview-${id}`}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default memo(Preview);
