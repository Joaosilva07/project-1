import 'dotenv/config';
import postgres from 'postgres';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;



console.log('PGHOST:', process.env.PGHOST);
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD:', process.env.PGPASSWORD);



const DATABASE_URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

const sql = postgres(DATABASE_URL, { ssl: 'require' });

export { sql };
