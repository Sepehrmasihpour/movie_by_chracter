// ! find out qhats the problem here and why the tests don't run
// ! I suspect it's because of the TS and the solution will require a package for jest to handle TS
// ! But still that's just a theory and needs to be confirmed

import { describe, it } from "node:test";
const fetchAllPopularIds = require("../popularId");

describe("fetch All Popular movie Ids", () => {
  it("movie Ids in a array", async () => {
    const movieIds = await fetchAllPopularIds(true);
    expect(Array.isArray(movieIds)).toBetruthy();
  });

  it("Movie Ids all integer", async () => {
    const movieIds = await fetchAllPopularIds(true);
    expect(movieIds.every((id) => typeof id === "integer")).toBeTruthy();
  });

  it("movie Ids have no duplicate", async () => {
    const movieIds = await fetchAllPopularIds(true);
    const uniqueIds = new Set(movieIds);
    expect(uniqueIds.size).toBe(movieIds.length);
  });

  it("tv show Ids in a array", async () => {
    const movieIds = await fetchAllPopularIds(false);
    expect(Array.isArray(movieIds)).toBetruthy();
  });

  it("tv show Ids all integer", async () => {
    const movieIds = await fetchAllPopularIds(false);
    expect(movieIds.every((id) => typeof id === "integer")).toBeTruthy();
  });

  it("tv show Ids have no duplicate", async () => {
    const movieIds = await fetchAllPopularIds(false);
    const uniqueIds = new Set(movieIds);
    expect(uniqueIds.size).toBe(movieIds.length);
  });
});
