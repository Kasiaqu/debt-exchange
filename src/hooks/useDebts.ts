import { Debt } from "../types/Debt";
import { format } from "date-fns";

export const useDebts = () => {
  const headers = ["Dłużnik", "NIP", "Kwota zadłużenia", "Data powstania zobowiązania"];
  
  const convertData = (data: Debt[]) => data.map((debt) => {
    return {
      name: debt.Name,
      nip: debt.NIP,
      amount: debt.Value,
      date: format(debt.Date, "dd-MM-yyyy"),
    };
  });

  const getTopDebts = async () => {
    try {
      const response = await fetch("https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts", {
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      data = convertData(data)

      return data
    } catch (error) {

      console.error('Error fetching data:', error);
      throw error
    }
  };

  const getFilteredDebts = async (phrase: string) => {
    try {

      const response = await fetch('https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetFilteredDebts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phrase
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
      data = convertData(data)

      return data
    } catch (error) {

      console.error('Error fetching data:', error);
      throw error
    }
  }
  return { getTopDebts, headers, getFilteredDebts };
};
