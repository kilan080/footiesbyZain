import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  api: jest.fn(),
}));

import LoginPage from "./page";
import { api } from "@/lib/api";

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // Rendering
  it("renders the sign in heading", () => {
    render(<LoginPage />);
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("renders email and password fields empty", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("you@example.com")).toHaveValue("");
    expect(screen.getByPlaceholderText("••••••••")).toHaveValue("");
  });

  it("hides password by default", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("••••••••")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("shows no error on initial render", () => {
    render(<LoginPage />);
    expect(
      screen.queryByText("Email and password are required."),
    ).not.toBeInTheDocument();
  });

  // Validation
  it("shows error when both fields are empty on submit", async () => {
    render(<LoginPage />);
    fireEvent.submit(screen.getByRole("form"));
    expect(
      await screen.findByText("Email and password are required."),
    ).toBeInTheDocument();
  });

  it("clears error when user starts typing", async () => {
    render(<LoginPage />);
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByText("Email and password are required.");

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { name: "email", value: "a" },
    });
    expect(
      screen.queryByText("Email and password are required."),
    ).not.toBeInTheDocument();
  });

  // Interactions
  it("toggles password visibility when eye icon is clicked", () => {
    render(<LoginPage />);
    const input = screen.getByPlaceholderText("••••••••");
    const toggleBtn = screen.getByTestId("VisibilityIcon").closest("button")!;

    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "password");
  });

  // API / Async
  it("shows loading spinner and disables button while submitting", async () => {
    (api as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { name: "email", value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { name: "password", value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i, hidden: true }),
    ).toBeDisabled();
  });

  it("shows error message when API returns an error", async () => {
    (api as jest.Mock).mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { name: "email", value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { name: "password", value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });

  // success flow
  it("saves token to localStorage on successful login", async () => {
    (api as jest.Mock).mockResolvedValue({ token: "abc123" });

    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { name: "email", value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { name: "password", value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("abc123");
    });
  });

  it("redirects to '/' after successful login", async () => {
    (api as jest.Mock).mockResolvedValue({ token: "abc123" });

    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { name: "email", value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { name: "password", value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
