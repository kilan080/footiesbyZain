import { fireEvent, render, screen } from "@testing-library/react";

const mockPush = jest.fn();

import LoginPage from "./page";

it.only("renders the admin login in heading", () => {
  render(<LoginPage />);
  expect(screen.getByText("Admin Login")).toBeInTheDocument();
});

it("shows loading spinner and disables button while submitting", async () => {
  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText("me@email.com"), {
    target: { name: "email", value: "test@test.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("••••••••"), {
    target: { name: "password", value: "password000" },
  });
  expect(
    screen.getByRole("button", { name: / login /i, hidden: true }),
  ).toBeDisabled();
});
