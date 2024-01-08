import { useState } from "react";

type UseCounterProps = {
  initialCount?: number;
  min?: number;
  max?: number;
};

export default function useCounter(props?: UseCounterProps) {
  const { initialCount = 0, min = -5, max = 5 } = props || {};
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((c) => (c < max ? c + 1 : c));

  const decrement = () => setCount((c) => (c > min ? c - 1 : c));

  const reset = () => setCount(initialCount);

  return { count, increment, decrement, reset };
}
