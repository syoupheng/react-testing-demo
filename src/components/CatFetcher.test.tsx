import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import CatFetcher from "./CatFetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { server } from "../tests/mocks/server";
import { HttpResponse, http } from "msw";

describe("CatFetcher -functional component", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CatFetcher />
      </QueryClientProvider>
    );
  });

  it("should display a loading message when the request is pending", async () => {
    const fetchButton = screen.getByRole("button", { name: "Fetch a cat" });
    await userEvent.click(fetchButton);
    expect(
      screen.getByRole("button", { name: /Loading/i })
    ).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      screen.getByRole("button", { name: /Loading/i })
    );
  });

  it("should display an image of a cat when the request succeeds", async () => {
    const fetchButton = screen.getByRole("button", { name: "Fetch a cat" });
    await userEvent.click(fetchButton);
    expect(await screen.findByAltText(/random cat/i)).toBeInTheDocument();
  });

  it("should display an error message when the request fails", async () => {
    server.use(
      http.get("https://api.thecatapi.com/v1/images/search", () => {
        return HttpResponse.json({ message: "Server error" }, { status: 500 });
      })
    );
    const fetchButton = screen.getByRole("button", { name: "Fetch a cat" });
    await userEvent.click(fetchButton);
    expect(await screen.findByText(/Failed to fetch cat/i)).toBeInTheDocument();
  });
});
