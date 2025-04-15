import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("should render App component with Search and Table", async () => {
  render(<App />);

  expect(screen.getByRole("searchbox")).toBeInTheDocument();

  expect(await screen.findByRole("table")).toBeInTheDocument();
});
