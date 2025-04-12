import { Search } from "./components/Search/Search";
import { Table } from "./components/Table/Table";
import { useDebts } from "./hooks/useDebts";
import './App.less';

function App() {
  const { headers, data } = useDebts();

  return (
    <div className="app">
      <div className="header">
          <Search />
      </div>
        <Table data={data} headers={headers} />
=    </div>
  );
}

export default App;
