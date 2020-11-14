const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'build'),
  readOnly: true,
  logger: true,
});
const port = process.env.PORT || 4000;

server.use(middlewares);
server.use('/api', router);

server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});
