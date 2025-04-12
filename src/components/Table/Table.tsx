import React from 'react';
import "./Table.less";

type Props = {
  data: { [key: string]: string | number }[];
  headers: string[];
};

export const Table: React.FC<Props> = ({ data, headers }) => {
  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="table__header-cell">
              {header.toLocaleUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="table__row">
            {Object.values(row).map((value, colIndex) => (
              <td key={colIndex} className="table__cell">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
