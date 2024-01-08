import { HttpResponse, delay, http } from "msw";

export const handlers = [
  http.get("https://api.thecatapi.com/v1/images/search", async () => {
    await delay();
    return HttpResponse.json([
      {
        id: "lala",
        url: "some url",
        width: 100,
        height: 100,
      },
    ]);
  }),
];
