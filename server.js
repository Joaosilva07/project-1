import { fastify } from 'fastify';
import DatabasePostgres from './database-postgres.js';

const server = fastify();

const database = new DatabasePostgres;

server.post('/cadastro', async (request, reply) => {
   
    const { login, password } = request.body;
    
    console.log(login, password);  

 
   await database.create({
        login,
        password,
    });

   
    return reply.status(201).send();
});

server.get('/usuarios', async (request) => {
    const search = request.query.search;  
    
    console.log("search:", search);  

    const users = await database.list(search);

    return users;
});

server.put('/usuarios/:id', async (request, reply) => {

    const userId = request.params.id
    const { login, password } = request.body;

    const user =  await database.update(userId, {
        login,
        password,


    })


    return reply.status(204).send()

})



server.delete('/usuarios/:id', async (request,reply) => {

    const userId = request.params.id

   await database.delete(userId)

    return reply.status(204).send()

})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT || 3333
});
