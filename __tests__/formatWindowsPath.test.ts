import formatWindowsPath from "../lib/formatWindowsPath";
import path from "path";
describe("formatWindowsPath", () => {
  it("should convert backslashes to slashes on Windows", () => {
    const originalFilePath = "folder\\file.txt";
    const expectedFilePath = "folder/file.txt";

    // mock process.platform to return 'win32'
    Object.defineProperty(process, "platform", {
      value: "win32",
    });
    // mock path.step to return '\'
    Object.defineProperty(path, "sep", {
      value: "\\",
    });
    // jest.spyOn(path, "sep", "get").mockReturnValue("\\");

    const result = formatWindowsPath(originalFilePath);
    expect(result).toBe(expectedFilePath);
  });

  it("should keep the path the same on non-Windows platforms", () => {
    const originalFilePath = "folder/file.txt";
    const expectedFilePath = originalFilePath;

    // mock process.platform to return 'darwin'
    Object.defineProperty(process, "platform", {
      value: "darwin",
    });

    Object.defineProperty(path, "sep", {
      value: "/",
    });

    const result = formatWindowsPath(originalFilePath);
    expect(result).toBe(expectedFilePath);
  });
});
