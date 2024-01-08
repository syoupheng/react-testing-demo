import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter - functional component", () => {
  it("should render with the correct count initially", () => {
    render(<Counter initialCount={2} />);
    expect(screen.getByRole("heading")).toHaveTextContent("2");
  });

  it("should decrement the count when clicking on the minus button", async () => {
    render(<Counter initialCount={2} />);
    const decrementButton = screen.getByRole("button", { name: "decrement" });
    await userEvent.click(decrementButton);
    expect(screen.getByRole("heading")).toHaveTextContent("1");
  });

  it("should increment the count when clicking on the plus button", async () => {
    render(<Counter initialCount={2} />);
    const incrementButton = screen.getByRole("button", { name: "increment" });
    await userEvent.click(incrementButton);
    expect(screen.getByRole("heading")).toHaveTextContent("3");
  });

  it("should disable the increment button when count is at max", async () => {
    render(<Counter initialCount={2} max={4} />);
    const incrementButton = screen.getByRole("button", { name: "increment" });
    expect(incrementButton).toBeEnabled();
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    expect(incrementButton).toBeDisabled();
  });
});
