import { render, screen, waitFor } from "@testing-library/react";
import { Table } from "./Table";
import { Debt } from "../../types/Debt";
import { getTopDebts } from "../../api/debts";

export const mockData: Debt[] = [
  { Name: "Name1", NIP: "1234567890", Value: 30000, Date: "2022-01-01" },
  { Name: "Name2", NIP: "9876543211", Value: 15000, Date: "2023-01-01" },
];

jest.mock("../../api/debts", () => ({
  getTopDebts: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});

test("show table when loading is false", async () => {
  (getTopDebts as jest.Mock).mockResolvedValueOnce(mockData);
  render(<Table debts={mockData} setDebts={jest.fn()} loading={false} />);
  expect(await screen.findByRole("table")).toBeInTheDocument();
});

test("show loader when loading is true", async () => {
  (getTopDebts as jest.Mock).mockResolvedValueOnce(mockData);
  render(<Table debts={mockData} setDebts={jest.fn()} loading={true} />);

  expect(await screen.findByTestId("loader")).toBeInTheDocument();
});

test("format debt values correctly", async () => {
  (getTopDebts as jest.Mock).mockResolvedValueOnce(mockData);

  render(<Table debts={[mockData[0]]} setDebts={jest.fn()} loading={false} />);

  expect(await screen.findByText("Name1")).toBeInTheDocument();
  expect(await screen.findByText("123-456-78-90")).toBeInTheDocument();
  expect(await screen.findByText("30 000")).toBeInTheDocument();
  expect(await screen.findByText("01-01-2022")).toBeInTheDocument();
});

test("render multiple rows when multiple debts provided", async () => {
  (getTopDebts as jest.Mock).mockResolvedValueOnce(mockData);

  render(<Table debts={mockData} setDebts={jest.fn()} loading={false} />);

  const rows = await screen.findAllByRole("row");
  expect(rows).toHaveLength(3);
});
