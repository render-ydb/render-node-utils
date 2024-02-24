# render-node-utils

<p>
<a href="https://www.npmjs.com/package/@x.render/render-node-utils" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/render-node-utils" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/render-node-utils" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Frender-node-utils" alt="NPM Downloads" /></a>

</p>

[英文文档](./README.md)

## 介绍

为 node 环境提供大量实用函数的库。

## 使用

```sh
npm i @x.render/render-node-utils -S
```

例如

```javascript
import { log } from "@x.render/render-node-utils";
```

或者

```javascript
import log from "@x.render/render-node-utils/lib/log";
```

## 具体功能

| 名称                           | 描述                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------- |
| buildConfig                    | 编译 typescript 文件并返回编译后的字符串                                     |
| checkNodeVersion               | 将当前 node 版本与传递的版本号进行比较                                       |
| clearConsole                   | 清除终端当前输出信息                                                         |
| dynamicImport                  | 动态加载模块                                                                 |
| fileSizeReporter               | 计算文件大小变化                                                             |
| formatWebpackMessages          | Fwebpack 编译后格式化输出信息                                                |
| formatWindowsPath              | 格式化操作系统文件路径                                                       |
| getNpmPkgLatestVersion         | 获取指定包的最新版本                                                         |
| getPathsOfFilesMatchingPattern | 获取指定路径的文件信息                                                       |
| loadConfig                     | 加载模块，支持三种文件类型：`.json`、`.js`、`.ts`                            |
| log                            | 提供不同风格的信息输出。支持 `debug`、`info`、`warn`、`error` 和 `success`。 |
| prepareURLs                    | 提供浏览器打开链接                                                           |
| runTask                        | 任务控制流程，提供任务开始、进度和结束状态显示                               |
| similar                        | 输出相似字符串的百分比                                                       |
| webpackStats                   | 格式化 webpack 编译的统计数据                                                |
