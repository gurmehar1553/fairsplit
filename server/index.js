const http = require('http');
const app = require('./app');
const { info } = require('./utils/logger');

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  info('Starting the server at port', process.env.PORT);
});
