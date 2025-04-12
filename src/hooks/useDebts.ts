import { useEffect, useState } from "react";
import { Debt } from "../types/Debt";
import { format } from "date-fns";

export const useDebts = () => {
  const headers = ["Dłużnik", "NIP", "Kwota zadłużenia", "Data powstania zobowiązania"];

  const getTopDebts = async () => {
    return await fetch("https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts").then((response) => response.json());
  };
  const [debts, setDebts] = useState<Debt[]>([]);

  useEffect(() => {
    getTopDebts().then((data) => setDebts(data));
  }, []);

  const data = debts.map((debt) => {
    return {
      name: debt.Name,
      nip: debt.NIP,
      amount: debt.Value,
      date: format(debt.Date, "dd-MM-yyyy"),
    };
  });

  return { getTopDebts, headers, debts, data };
};
