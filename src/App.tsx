import { Search } from "./components/Search/Search";
import { Table } from "./components/Table/Table";
import "./App.less";
import { useEffect, useState } from "react";
import { getFilteredDebts, getTopDebts } from "./api/debts";
import { Headers } from "./utils/debts";
import { Debt } from "./types/Debt";

function App() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<{ order: "asc" | "desc"; column: Headers }>({
    order: "desc",
    column: Headers.Name,
  });

  const sortByColumn = (
    data: Debt[],
    column: Headers,
    forceOrder?: "asc" | "desc"
  ) => {
    let order: "asc" | "desc" = "asc";
    if (forceOrder) {
      order = forceOrder;
    } else if (sort.column === column) {
      order = sort.order === "asc" ? "desc" : "asc";
    }

    const multiplier = order === "asc" ? 1 : -1;
    const sortedDebts = [...data].sort((a, b) => {
      switch (column) {
        case Headers.Name:
          return multiplier * a.Name.localeCompare(b.Name);
        case Headers.NIP:
          return multiplier * a.NIP.localeCompare(b.NIP);
        case Headers.Value:
          return multiplier * (a.Value - b.Value);
        case Headers.Date:
          return (
            multiplier *
            (new Date(a.Date).getTime() - new Date(b.Date).getTime())
          );
        default:
          return 0;
      }
    });

    setDebts(sortedDebts);
    setSort({ order, column });
  };

  const loadAndSortDebts = async (fetchFn: () => Promise<Debt[]>) => {
    setLoading(true);
    try {
      const data = await fetchFn();
      setDebts(data);
      sortByColumn(data, Headers.Name, "asc");
    } finally {
      setLoading(false);
    }
  };

  const loadFilteredDebts = (phrase: string) => {
    return loadAndSortDebts(() => getFilteredDebts(phrase));
  };

  const loadTopDebts = () => {
    return loadAndSortDebts(getTopDebts);
  };

  useEffect(() => {
    loadTopDebts();
  }, []);

  return (
    <div className="app">
      <div className="header">
        <Search
          loading={loading}
          loadFilteredDebts={loadFilteredDebts}
          loadTopDebts={loadTopDebts}
        />
      </div>
      <Table
        debts={debts}
        loading={loading}
        sort={sort}
        sortByColumn={sortByColumn}
      />
    </div>
  );
}

export default App;
