import similarity from "../lib/similar";

describe("similarity", () => {
  it("Test Case 1", () => {
    const str1 = "abcd";
    const str2 = "abcd";
    expect(similarity(str1, str2)).toBe(100);
  });

  it("Test Case 2", () => {
    const str1 = "abcd";
    const str2 = "efgh";
    expect(similarity(str1, str2)).toBe(0);
  });

  it("Test Case 3", () => {
    const str1 = "abcd";
    const str2 = "abef";
    expect(similarity(str1, str2)).toBe(50);
  });

  it("Test Case 4", () => {
    const str1 = "abcd";
    const str2 = "aegf";
    expect(similarity(str1, str2)).toBe(25);
  });
});
