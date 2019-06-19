const ENV = process.env.NODE_ENV || 'development';
const testData = require('./test');
const devData = require('./dev');

const data = {
  production: devData,
  development: devData,
  test: testData
};

module.exports = data[ENV];
