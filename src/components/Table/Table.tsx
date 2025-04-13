import React, { Dispatch, SetStateAction, useEffect } from 'react';
import "./Table.less";
import { Container } from '../Container/Container';
import { useDebts } from '../../hooks/useDebts';
import { Debt } from '../../types/Debt';
import { Loader } from '../Loader/Loader';

type Props = {
  debts: Debt[];
  setDebts: Dispatch<SetStateAction<Debt[]>>
  loading: boolean;
  
}

export const Table: React.FC<Props> = ({ debts, setDebts, loading }) => {
  const { headers, getTopDebts } = useDebts();

  useEffect(() => {
      getTopDebts().then(data => setDebts(data))
  }, []);

  if(loading) {
    return <Loader />
  }

  return (
    <Container>
      <div className='table__wrapper'>
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
            {debts.length
            ? debts.map((row, rowIndex) => (
              <tr key={rowIndex} className="table__row">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="table__cell">
                    {value}
                  </td>
                ))}
              </tr>
            ))
            : <tr className="table__row-no-data">
                <td className="table__cell" colSpan={4}>
                  Brak danych
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </Container>
  );
};
