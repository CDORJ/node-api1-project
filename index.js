const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE
server.listen(port, () => {
     console.log(`\n*** CORS -enabled server listening on port ${port} ***\n`)
 })