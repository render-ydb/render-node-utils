import axios from "axios";
import getNpmPkgLatestVersion from "../lib/getNpmPkgLatestVersion";

jest.mock("axios");

describe("getNpmPkgLatestVersion", () => {
  // 当正确的包名和默认的npm仓库地址传入时，应该能够返回最新的包版本号
  it("should return the latest version of the npm package for valid package name and default npm registry", async () => {
    const mockData = { latest: "1.0.0" };
    const response = { data: mockData, status: 200 };
    (axios.get as jest.Mock).mockResolvedValueOnce(response);

    const result = await getNpmPkgLatestVersion("valid-package-name");
    expect(result).toBe("1.0.0");
    expect(axios.get).toBeCalledWith(
      "https://registry.npmjs.org/-/package/valid-package-name/dist-tags"
    );
  });

  // 当正确的包名和指定的npm仓库地址传入时，应该能够返回最新的包版本号
  it("should return the latest version of the npm package for valid package name and given npm registry", async () => {
    const mockData = { latest: "1.0.0" };
    const response = { data: mockData, status: 200 };
    (axios.get as jest.Mock).mockResolvedValueOnce(response);

    const result = await getNpmPkgLatestVersion(
      "valid-package-name",
      "https://custom.registry.com"
    );
    expect(result).toBe("1.0.0");
    expect(axios.get).toBeCalledWith(
      "https://custom.registry.com/-/package/valid-package-name/dist-tags"
    );
  });

  //当请求返回的状态码非200时，应该抛出异常
  it("should throw an error when the response status is not 200", async () => {
    const response = { status: 404 };
    (axios.get as jest.Mock).mockResolvedValueOnce(response);

    await expect(getNpmPkgLatestVersion("valid-package-name")).rejects.toThrow(
      "Unexpected response status: 404"
    );
  });

  //：当请求get方法出现异常时，应该抛出异常
  it("should throw an error when axios get method fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    await expect(getNpmPkgLatestVersion("valid-package-name")).rejects.toThrow(
      "Network Error"
    );
  });
});
