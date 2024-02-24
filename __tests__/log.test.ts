// 导入依赖
import npmlog from "npmlog";
import { debug, info, success, warn, error, setLogLevel } from "../lib/log";

jest.mock("npmlog");

describe("debug function", () => {
  // 测试debug函数
  it("should print blue debug log", () => {
    // Mocking npmlog.debug
    npmlog.debug = jest.fn();

    const msg = "Debug message";
    const prefix = "Test Prefix";

    // Call debug function
    debug(msg, prefix);

    // Check if debug function of npmlog was called with right arguments
    expect(npmlog.debug).toHaveBeenCalledWith(prefix, msg);
  });
});

describe("info function", () => {
  it("should print cyan info log", () => {
    // Mocking npmlog.info
    npmlog.info = jest.fn();

    const msg = "Info message";
    const prefix = "Test Prefix";

    // Call info function
    info(msg, prefix);

    // Check if info function of npmlog was called with right arguments
    expect(npmlog.info).toHaveBeenCalledWith(prefix, msg);
  });
});

describe("warn function", () => {
  it("should print yellow warn log", () => {
    // Mocking npmlog.warn
    npmlog.warn = jest.fn();

    const msg = "Warn message";
    const prefix = "Test Prefix";

    // Call warn function
    warn(msg, prefix);

    // Check if warn function of npmlog was called with right arguments
    expect(npmlog.warn).toHaveBeenCalledWith(prefix, msg);
  });
});

describe("error function", () => {
  it("should print red error log", () => {
    // Mocking npmlog.error
    npmlog.error = jest.fn();

    const msg = "Error message";
    const prefix = "Test Prefix";

    // Call error function
    error(msg, prefix);

    // Check if error function of npmlog was called with right arguments
    expect(npmlog.error).toHaveBeenCalledWith(prefix, msg);
  });
});

describe("success function", () => {
  it("should print green success log", () => {
    // Mocking npmlog.success
    npmlog.success = jest.fn();

    const msg = "Success message";
    const prefix = "Test Prefix";

    // Call success function
    success(msg, prefix);

    // Check if success function of npmlog was called with right arguments
    expect(npmlog.success).toHaveBeenCalledWith(prefix, msg);
  });
});

describe("setLogLevel function", () => {
  it("should set log level", () => {
    const level = "debug";

    // Call setLogLevel function
    setLogLevel(level);

    // Check if level of npmlog was set correctly
    expect(npmlog.level).toEqual(level);
  });
});
