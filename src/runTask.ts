import chalk = require('chalk');

const ora = require('ora');

interface TaskInfo {
  beginText: string;
  fn: () => any;
  endText: string;
}

async function runTask(tasks: TaskInfo[] = []) {
  for (const item of tasks) {
    const spinner = ora({
      spinner: 'dots',
    });
    const { beginText, fn, endText } = item;
    spinner.text = beginText;
    spinner.start();
    await fn();
    spinner.succeed(endText);
  }
}

runTask.beginTextStyle = (text: string, header = 'render-builder') => {
  return `${chalk.cyan('info')} ${chalk.magenta(header)} ${chalk.cyan(text)}\n`;
};

runTask.endTextStyle = (text: string, header = 'render-builder') => {
  return `${chalk.green('success')} ${chalk.magenta(header)} ${chalk.green(
    text,
  )}`;
};

export = runTask;
