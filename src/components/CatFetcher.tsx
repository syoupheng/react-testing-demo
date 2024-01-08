import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

async function fetchCat() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  if (!response.ok) throw new Error("Failed to fetch cat");
  const [data] = await response.json();
  return data as Cat;
}

export default function CatFetcher() {
  const { data, isPending, isError, error, mutate } = useMutation({
    mutationFn: fetchCat,
  });
  const [hasFetched, setHasFetched] = useState(false);

  return (
    <>
      <button
        disabled={isPending}
        className="mb-4"
        onClick={() => {
          setHasFetched(true);
          mutate();
        }}
      >
        {isPending ? "Loading..." : "Fetch a cat"}
      </button>
      <div className="h-56 p-4">
        {!hasFetched && <h2>No cat yet...</h2>}
        {isError && (
          <h2 className="bg-red-400 rounded-md p-4">{error?.message}</h2>
        )}
        {data && (
          <img className="object-cover h-48" src={data.url} alt="random cat" />
        )}
      </div>
    </>
  );
}
