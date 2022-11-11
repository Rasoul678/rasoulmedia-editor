import style from "./resizable.module.css";
interface IProps {
  direction: "horizontal" | "vertical";
}
const Handle: React.FC<IProps> = ({ direction }) => {
  return (
    <div
      className={
        direction === "horizontal"
          ? style.resizable__Hhandle
          : style.resizable__Vhandle
      }
    >
      <div>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default Handle;
