import { describe, it, expect } from "vitest";
import { fetchAllPopularIds } from "../../src/data/popularId";

describe("fetch Popular Movie Id", () => {
  it("should return an array of numbers ", async () => {
    const result = await fetchAllPopularIds(true);

    // Check if the result is an array
    expect(Array.isArray(result)).toBe(true);

    // Check if every item in the array is a number
    const allNumbers = result.every((item) => typeof item === "number");
    expect(allNumbers).toBe(true);
  });
});

describe("fetch Popular Tv shows Id", () => {
  it("should return an array of numbers ", async () => {
    const result = await fetchAllPopularIds(false);

    // Check if the result is an array
    expect(Array.isArray(result)).toBe(true);

    // Check if every item in the array is a number
    const allNumbers = result.every((item) => typeof item === "number");
    expect(allNumbers).toBe(true);
  });
});
