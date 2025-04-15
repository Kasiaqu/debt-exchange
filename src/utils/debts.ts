import { formatDate } from "date-fns";
import { DebtDto } from "../types/Debt";

export const convertData = (data: DebtDto[]) =>
  data.map((debt) => {
    return {
      Name: debt.Name,
      NIP: debt.NIP,
      Value: debt.Value,
      Date: debt.Date,
    };
  });

export enum Headers {
  Name = "Name",
  NIP = "NIP",
  Value = "Value",
  Date = "Date",
}

export const headers: { name: Headers; title: string }[] = [
  { name: Headers.Name, title: "Dłużnik" },
  { name: Headers.NIP, title: "NIP" },
  { name: Headers.Value, title: "Kwota zadłużenia" },
  { name: Headers.Date, title: "Data powstania zobowiązania" },
];

export const formatValue = (header: Headers, value: string | number) => {
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
export const alignCell = (header: Headers) => {
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
