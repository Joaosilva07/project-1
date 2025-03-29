import { randomUUID } from "node:crypto";

import {sql } from './database.js'

export default class DatabasePostgres { 
    async list(search) {
        console.log("search:", search);  // Verificar se o search está chegando corretamente
        let users;
    
        if (search) {
            users = await sql`
                SELECT * FROM users
                WHERE login ILIKE ${`%${search}%`};
            `;
        } else {
            users = await sql`
                SELECT * FROM users;
            `;
        }
    
        return users;
    }
    
    

    async create(user) {
        const userId = randomUUID();  
        const { login, password } = user;
    
        await sql`
            INSERT INTO users (id, login, password) VALUES (${userId}, ${login}, ${password});
        `;
    }

    async update(id, user) {

        const { login, password } = user;

        await sql `update users set login = ${login}, password = ${password} WHERE id = ${id} `
        

    }

    async delete(id) {

       await sql `delete from users where id = ${id}` 
       
    }
}
