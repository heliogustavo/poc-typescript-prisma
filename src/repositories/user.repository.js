import { db } from "../database/db.connection.js"

export function getUserByEmailDB(email) {
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email])
}

export function getCompleteUserDB(userId) {
    return db.query(`
        SELECT cats.id, cats.name, 
            FROM users 
            JOIN cats ON users.id = cats."userId"
            WHERE users.id=$1
            GROUP BY users.id, users.name;`,
        [userId]
    )
}


export function createUserDB(name, email, password, cpf, numberPhone) {
    return db.query(
        `INSERT INTO users (name, email, password, cpf, "numberPhone") VALUES ($1, $2, $3, $4, $5);`,
        [name, email, password, cpf, numberPhone]
    )
}
