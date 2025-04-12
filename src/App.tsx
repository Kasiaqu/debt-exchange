import { Table } from "./components/Table/Table";
import { useDebts } from "./hooks/useDebts";

function App() {
  const { headers, data } = useDebts();

  return (
    <div className="App">
      <Table data={data} headers={headers} />
    </div>
  );
}

export default App;
