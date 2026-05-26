import mysql2 from "mysql2/promise"

const databaseConnection = await mysql2.createConnection({
    host: 'Database',
    port: 3306,
    user: 'root',
    password: "root",
    database: 'NMCDATABASE',
});

export { databaseConnection }