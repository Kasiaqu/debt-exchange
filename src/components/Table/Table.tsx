import React, { Dispatch, SetStateAction, useEffect } from "react";
import "./Table.less";
import { Container } from "../Container/Container";
import { Debt } from "../../types/Debt";
import { Loader } from "../Loader/Loader";
import { formatDate } from "date-fns";
import { headers, Headers } from "../../utils/debts";
import { getTopDebts } from "../../api/debts";
import { useSort } from "../../hooks/useSort";

type Props = {
  debts: Debt[];
  setDebts: Dispatch<SetStateAction<Debt[]>>;
  loading: boolean;
};

export const Table: React.FC<Props> = ({ debts, setDebts, loading }) => {
  const { sortByColumn, sortColumn, sortOrder } = useSort(setDebts);

  const formatValue = (header: Headers, value: string | number) => {
    switch (header) {
      case Headers.Name:
        return value;
      case Headers.NIP:
        return (value as string).replace(
          /(\d{3})(\d{3})(\d{2})(\d{2})/,
          "$1-$2-$3-$4"
        );
      case Headers.Value:
        return value.toLocaleString("pl-PL").padStart(8, " ");
      case Headers.Date:
        return formatDate(value, "dd-MM-yyyy");
      default:
        return value;
    }
  };

  const alignCell = (header: Headers) => {
    switch (header) {
      case Headers.Name:
        return "";
      case Headers.NIP:
        return "align-center no-wrap";
      case Headers.Value:
        return "align-right";
      case Headers.Date:
        return "align-right";
      default:
        return "";
    }
  };

  useEffect(() => {
    getTopDebts().then((data) => {
      setDebts(data);
      sortByColumn(data, Headers.Name);
    });
  }, []);

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
                      {sortColumn === header.name && (
                        <img
                          src="arrow.svg"
                          alt="arrow"
                          className={`table__header-arrow ${
                            sortOrder === "asc" ? "arrow-asc" : "arrow-desc"
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
