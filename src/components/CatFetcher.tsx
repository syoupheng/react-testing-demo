import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
  const { data, error, isError, isPending, mutate } = useMutation({
    mutationFn: fetchCat,
    onSuccess: () => toast.success("Here is a new cat !"),
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
      <div className="h-48 p-4">
        {!hasFetched && <h2>No cat yet...</h2>}
        {isError && <p>{error.message}</p>}
        {data && (
          <img className="object-cover h-48" src={data.url} alt="random cat" />
        )}
      </div>
      <Toaster />
    </>
  );
}
