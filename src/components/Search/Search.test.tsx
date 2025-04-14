import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Search } from "./Search";
import "@testing-library/jest-dom";
import { getFilteredDebts } from "../../api/debts";
import { mockData } from "../Table/Table.test";

jest.mock("../../api/debts", () => ({
  getFilteredDebts: jest.fn(),
  getTopDebts: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});

test("show error message if phrase length is less than 3", async () => {
  render(
    <Search setDebts={jest.fn()} setLoading={jest.fn()} loading={false} />
  );

  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "ab" } });

  const button = screen.getByRole("button", { name: /szukaj/i });
  fireEvent.click(button);

  expect(await screen.findByText("Minimalna długość to 3")).toBeInTheDocument();
});

test("return array with one object if only one matches the search phrase", async () => {
  const setDebts = jest.fn();
  const setLoading = jest.fn();

  (getFilteredDebts as jest.Mock).mockResolvedValueOnce([mockData[0]]);

  render(
    <Search setDebts={setDebts} setLoading={setLoading} loading={false} />
  );

  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "Name 1" } });

  const button = screen.getByRole("button", { name: /szukaj/i });
  fireEvent.click(button);

  await waitFor(() => {
    expect(getFilteredDebts).toHaveBeenCalledWith("Name 1");
  });
  await waitFor(() => {
    expect(setDebts).toHaveBeenCalledWith([mockData[0]]);
  });
});

test("return an empty array if no matching data is found", async () => {
  const setDebts = jest.fn();
  const setLoading = jest.fn();

  (getFilteredDebts as jest.Mock).mockResolvedValueOnce([]);

  render(
    <Search setDebts={setDebts} setLoading={setLoading} loading={false} />
  );

  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "Non-matching phrase" } });

  const button = screen.getByRole("button", { name: /szukaj/i });
  fireEvent.click(button);

  await waitFor(() => {
    expect(getFilteredDebts).toHaveBeenCalledWith("Non-matching phrase");
  });
  await waitFor(() => {
    expect(setDebts).toHaveBeenCalledWith([]);
  });
});
