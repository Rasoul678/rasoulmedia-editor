import "bulmaswatch/cyborg/bulmaswatch.min.css";
import CellList from "./components/cell-list";
import { useBundlerService } from "./hooks/useBundlerService";

const InitAppMessage = () => <div className="Init__App">Initializing App...</div>;

const App = () => {
  //* initialize bundler
  const isReady = useBundlerService();

  return (
    <div style={{ margin: "3rem 1rem" }}>
      {isReady ? <CellList /> : <InitAppMessage />}
    </div>
  );
};

export default App;
