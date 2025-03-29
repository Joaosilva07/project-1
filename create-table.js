import { sql } from './database.js'

sql`
    DROP TABLE IF EXISTS users;
`
.then(() => {
    return sql`
        CREATE TABLE users (
            id TEXT PRIMARY KEY,
            login VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `;
})
.then(() => {
    console.log('Tabela recriada ');
})
.catch((error) => {
    console.error(error);
});
