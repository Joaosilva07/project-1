import fastify from 'fastify';
import DatabasePostgres from './database-postgres.js';
import fastifyCors from 'fastify-cors';

const server = fastify();

// Register CORS with the correct configuration
server.register(fastifyCors, {
    origin: 'http://127.0.0.1:5500',  // Allow specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    preflightContinue: false,  // Do not allow additional headers
    optionsSuccessStatus: 204 // Status for successful preflight
});

const database = new DatabasePostgres();

// Route to register a user
server.post('/cadastro', async (request, reply) => {
    console.log('Route /cadastro called');
    const { login, password } = request.body;
    await database.create({ login, password });
    return reply.status(201).send();
});

// Route to get users
server.get('/usuarios', async (request, reply) => {
    const search = request.query.search;
    const users = await database.list(search);
    return reply.status(200).send(users);
});

// Route to update users
server.put('/usuarios/:id', async (request, reply) => {
    const userId = request.params.id;
    const { login, password } = request.body;
    await database.update(userId, { login, password });
    return reply.status(204).send();
});

// Route to delete users
server.delete('/usuarios/:id', async (request, reply) => {
    const userId = request.params.id;
    await database.delete(userId);
    return reply.status(204).send();
});

// Server listening on port 3333
server.listen({ host: '0.0.0.0', port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});