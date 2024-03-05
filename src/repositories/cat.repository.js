import { db } from "../database/db.connection.js"

export function createMiaudeloDB(photoLink, features, userId) {
    return db.query(
        `INSERT INTO cats ("photoLink", "features", "userId") 
            VALUES ($1, $2, $3) 
            RETURNING features, available`,
        [photoLink, features, userId]
    )
}

export async function getOneMiaudeloDB(id) {
    try {
        const query = `
            SELECT 
                cats.*, 
                users."numberPhone" 
            FROM 
                cats 
            INNER JOIN 
                users 
            ON 
                cats."userId" = users.id 
            WHERE 
                cats.id = $1`;
        
        const { rows } = await db.query(query, [id]);
        
        return rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar detalhes do miaudelo: ${error.message}`);
    }
}



export function getAllMiaudelos() {
    return db.query(`SELECT * FROM cats`)
}

export function editStatusPhotoCatDB(userId, statusPhoto, id) {
    return db.query(
        `UPDATE cats
        SET available = $1
        WHERE id = $2`,
        [statusPhoto, id]
    )
}
