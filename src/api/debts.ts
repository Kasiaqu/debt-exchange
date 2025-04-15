import { convertData } from "../utils/debts";

export const getTopDebts = async () => {
  try {
    const response = await fetch(
      "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();

    return convertData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getFilteredDebts = async (phrase: string) => {
  try {
    const response = await fetch(
      "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetFilteredDebts",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phrase,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();

    return convertData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
