import chalk from "chalk";

function printErrorAndExit(message) {
  console.error(chalk.blue(message));
  console.log("\x1b[31m This text will be red \x1b[0m");
  console.log('this is log');
  // process.exit(1);
}

printErrorAndExit('直接 node bash-node.mjs 执行此文件、会显示颜色');
printErrorAndExit('被 bash 直接调用、会显示颜色');
printErrorAndExit('被 bash 这样 $(node bash-node.mjs) 调用、不会显示颜色');
