import { expect, test } from "vitest";
import { isValidLink } from "./utils";

test("valid link should return true", () => {
  expect(isValidLink("https://lichess.org/")).toBe(true);
});

test("link with wrong protocol should throw error", () => {
  expect(() => isValidLink("htt://ab.rog")).toThrow(
    "The link should have http/https at the start",
  );
});

test("link with double slashes should throw error", () => {
  expect(() => isValidLink("http://://link.org")).toThrow(
    "The link should contain only one pair of slashes",
  );
});

test("link without a dot should throw error", () => {
  expect(() => isValidLink("http://linkorg")).toThrow(
    "The link should include a dot",
  );
});
