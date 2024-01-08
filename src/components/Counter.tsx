import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";

type Props = {
  initialCount?: number;
  min?: number;
  max?: number;
};

export default function Counter({
  initialCount = 0,
  min = -5,
  max = 5,
}: Props) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((c) => (c < max ? c + 1 : c));

  const decrement = () => setCount((c) => (c > min ? c - 1 : c));

  const reset = () => setCount(initialCount);

  return (
    <>
      <div className="flex justify-between gap-8">
        <button
          className="text-4xl font-bold"
          onClick={decrement}
          disabled={count <= min}
        >
          -
        </button>
        <h1>{count}</h1>
        <button
          className="text-4xl font-bold"
          onClick={increment}
          disabled={count >= max}
        >
          +
        </button>
      </div>
      <button className="mt-4" onClick={reset}>
        <GrPowerReset size={25} />
      </button>
    </>
  );
}
