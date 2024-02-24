# render-node-utils

<p>
<a href="https://www.npmjs.com/package/@x.render/render-node-utils" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/render-node-utils" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/render-node-utils" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Frender-node-utils" alt="NPM Downloads" /></a>

</p>

[中文文档](./README.zh.md)

## Introduce

A library that provides a multitude of utility functions for the node environment.

## Usage

```sh
npm i @x.render/render-node-utils -S
```

for example

```javascript
import { log } from "@x.render/render-node-utils";
```

or

```javascript
import log from "@x.render/render-node-utils/lib/log";
```

## Specific functions

| Name                           | Description                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| buildConfig                    | Compile the typescript file and return the compiled string                                             |
| checkNodeVersion               | Compare the current node version with the passed version number                                        |
| clearConsole                   | Clear the current output of the terminal                                                               |
| dynamicImport                  | Dynamically import modules                                                                             |
| fileSizeReporter               | Calculate file size changes                                                                            |
| formatWebpackMessages          | Format the output information after webpack compilation                                                |
| formatWindowsPath              | Format operating system file path                                                                      |
| getNpmPkgLatestVersion         | Get the latest version of the specified package                                                        |
| getPathsOfFilesMatchingPattern | Get file information of the specified path                                                             |
| loadConfig                     | Load module.Supports three file types: `.json`, `.js`, and `.ts`                                       |
| log                            | Provide different styles of information output.Support `debug`, `info`, `warn`, `error` and `success`. |
| prepareURLs                    | Provide the browser to open the link                                                                   |
| runTask                        | Task control process, providing task start, progress and end status display                            |
| similar                        | Output the percentage of similar strings                                                               |
| webpackStats                   | Format webpack compiled stats                                                                          |
