import { Search } from "./components/Search/Search";
import { Table } from "./components/Table/Table";
import './App.less';
import { useState } from "react";
import { Debt } from "./types/Debt";

function App() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(false)

  return (
    <div className="app">
      <div className="header">
          <Search setDebts={setDebts} setLoading={setLoading} loading={loading} />
      </div>
      <Table debts={debts} setDebts={setDebts} loading={loading} />
    </div>
  );
}

export default App;
