import { Debt } from "../types/Debt";

export const convertData = (data: Debt[]) => data.map((debt) => {
  return {
    Name: debt.Name,
    NIP: debt.NIP,
    Value: debt.Value,
    Date: debt.Date,
  };
});

export enum Headers {
  Name = 'Name',
  NIP = 'NIP',
  Value = 'Value',
  Date = 'Date'
}

export const headers: { name: Headers, title: string }[] = [
  { name: Headers.Name, title: "Dłużnik" },
  { name: Headers.NIP, title: "NIP" },
  { name: Headers.Value, title: "Kwota zadłużenia" },
  { name: Headers.Date, title: "Data powstania zobowiązania" }
];