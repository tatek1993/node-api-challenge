const express = require('express');

const helmet = require('helmet');

const server = express();
// the routers
const projectsRouter = require('./data/api/projectsRouter');

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ message: "The server is running! ✨" });
});

server.use('/api/projects', projectsRouter)

module.exports = server;