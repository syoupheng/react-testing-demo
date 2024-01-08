import { act, renderHook } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter - custom hook", () => {
  it("should increment the count", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it("should decrement the count", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-1);
  });

  it("should reset the count", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
    act(() => result.current.reset());
    expect(result.current.count).toBe(0);
  });

  it("should not increment the count beyond the max value", () => {
    const { result } = renderHook(() => useCounter({ max: 2 }));
    expect(result.current.count).toBe(0);
    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.increment());
    expect(result.current.count).toBe(2);
  });
});
