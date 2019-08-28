const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('setupProxy');
  app.use(proxy('/api', { target: 'http://localhost:8081/' }));
};
