import { useRef, useState } from "react";
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import "./markdown.css";
import { Cell } from "../../state/action-creators";
import { useAction } from "../../hooks/useAction";

interface IProps {
  cell: Cell;
}

const MarkdownEditor: React.FC<IProps> = ({ cell: { content, id } }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { updateCell } = useAction();

  useOnClickOutside(ref, () => setIsEditing(false));

  const handleChangeText: MDEditorProps["onChange"] = (value) => {
    updateCell(value || "", id);
  };

  return (
    <div>
      {isEditing && (
        <div ref={ref}>
          <MDEditor
            value={content}
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
              source={content || 'Click to edit!'}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
