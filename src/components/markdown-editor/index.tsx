import { useRef, useState } from "react";
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import "./markdown.css";

interface IProps {}

const MarkdownEditor: React.FC<IProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("# Hello world!!!");

  useOnClickOutside(ref, () => setIsEditing(false));

  const handleChangeText: MDEditorProps["onChange"] = (value) => {
    setValue(value || "");
  };

  return (
    <div>
      {isEditing && (
        <div ref={ref}>
          <MDEditor
            value={value}
            onChange={handleChangeText}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
      )}

      {!isEditing && (
        <div className="card" onClick={() => setIsEditing(true)}>
          <div className="card-content">
            <MDEditor.Markdown
              source={value}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
