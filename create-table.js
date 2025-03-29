import { sql } from './database.js'

sql `

    CREATE TABLE users (
    login VARCHAR(255) NOT NULL,   
    password VARCHAR(255) NOT NULL 

);


` .then(() =>{

    console.log('tabela criada')
})