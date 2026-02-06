import { getConnectionDB } from "../db/getConnectionDB.js"

export const getAuth = async function(username) {
    try {
        const db = await getConnectionDB()
        const row = await db.get('SELECT * FROM account WHERE username = ?',
            [username]
        ) 
        return row || null
    } catch (error) {
        console.error('Error in getAuth:', error)
        return null
    }
}
