import "./Table.less";
import { Container } from "../Container/Container";
import { Loader } from "../Loader/Loader";
import { alignCell, formatValue, headers, Headers } from "../../utils/debts";
import { Debt } from "../../types/Debt";

type Props = {
  debts: Debt[];
  loading: boolean;
  sort: { order: "asc" | "desc"; column: Headers };
  sortByColumn: (data: Debt[], column: Headers) => void;
};

export const Table: React.FC<Props> = ({
  debts,
  loading,
  sort,
  sortByColumn,
}) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="table__wrapper">
        <table className="table">
          <thead className="table__header">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`table__header-cell ${alignCell(header.name)}`}
                  onClick={() => sortByColumn(debts, header.name)}
                >
                  <div className={`table__header-cell-flex`}>
                    <div>{header.title.toLocaleUpperCase()}</div>
                    <div className="table__header-arrow-wrapper">
                      {sort.column === header.name && (
                        <img
                          src="arrow.svg"
                          alt="arrow"
                          className={`table__header-arrow ${
                            sort.order === "asc" ? "arrow-asc" : "arrow-desc"
                          }`}
                          height="12px"
                          width="auto"
                        />
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {debts.length ? (
              debts.map((row, rowIndex) => (
                <tr key={rowIndex} className="table__row">
                  {Object.entries(row).map(([key, value], colIndex) => (
                    <td
                      key={colIndex}
                      className={`table__cell ${alignCell(key as Headers)}`}
                    >
                      {formatValue(key as Headers, value)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="table__row-no-data">
                <td className="table__cell" colSpan={4}>
                  Brak danych
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};
