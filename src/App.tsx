import "bulmaswatch/cyborg/bulmaswatch.min.css";
import CellList from "./components/cell-list";
import { useBundlerService } from "./hooks/useBundlerService";

const App = () => {
  //* initialize bundler
  useBundlerService();

  return (
    <div style={{ margin: "3rem 1rem" }}>
      <CellList />
    </div>
  );
};

export default App;
