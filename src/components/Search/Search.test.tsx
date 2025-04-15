import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Search } from "./Search";
import "@testing-library/jest-dom";
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
    <Search
      loadTopDebts={jest.fn()}
      loadFilteredDebts={jest.fn()}
      loading={false}
    />
  );

  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "ab" } });

  const button = screen.getByRole("button", { name: /szukaj/i });
  fireEvent.click(button);

  expect(
    await screen.findByText("Wpisz co najmniej 3 znaki")
  ).toBeInTheDocument();
});

test("return array with one object if only one matches the search phrase", async () => {
  const loadFilteredDebts = jest.fn();

  (loadFilteredDebts as jest.Mock).mockResolvedValueOnce([mockData[0]]);

  render(
    <Search
      loadTopDebts={jest.fn()}
      loadFilteredDebts={loadFilteredDebts}
      loading={false}
    />
  );

  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "Name 1" } });

  const button = screen.getByRole("button", { name: /szukaj/i });
  fireEvent.click(button);

  await waitFor(() => {
    expect(loadFilteredDebts).toHaveBeenCalledWith("Name 1");
  });
});

test("return an empty array if no matching data is found", async () => {
  const loadFilteredDebts = jest.fn();
  (loadFilteredDebts as jest.Mock).mockResolvedValueOnce([]);

  render(
    <Search
      loadTopDebts={jest.fn()}
      loadFilteredDebts={loadFilteredDebts}
      loading={false}
    />
  );

  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "Non-matching phrase" } });

  const button = screen.getByRole("button", { name: /szukaj/i });
  fireEvent.click(button);

  await waitFor(() => {
    expect(loadFilteredDebts).toHaveBeenCalledWith("Non-matching phrase");
  });
});
