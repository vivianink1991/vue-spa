const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares)

function getJsonFile(filePath) {
    const file = require(path.join(__dirname, `${filePath}.json`))
    return file
}

server.get('/api/test', (req, res) => {
    res.jsonp(getJsonFile('./test'));
});

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser)

// server.use(router)

server.listen(9000, () => {
    console.log('Mock Server is running at http://localhost:9000')
})
