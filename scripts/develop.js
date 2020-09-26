const client = require('scp2');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora(chalk.cyan('deploying...'));
spinner.start();

client.scp('build/', {
  host: '192.168.123.36', //
  username: 'liao',
  password: 'zz8421139321',
  path: '/home/app/educate-books',
}, function (err) {
  if (err) throw err;
  spinner.stop();
  console.log(chalk.green('Deploy completed at http://192.168.123.36'));
});
