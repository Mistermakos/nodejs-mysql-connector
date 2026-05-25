import mysql2 from "mysql2"

const databaseConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
});

export { databaseConnection }