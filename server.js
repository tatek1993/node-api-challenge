const express = require('express');

const helmet = require('helmet');

const server = express();
// the routers
const projectsRouter = require('./data/api/projectsRouter');
const actionsRouter = require('./data/api/actionsRouter');
server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({ message: "The server is running! ✨" });
});

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;