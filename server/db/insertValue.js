import { getConnectionDB } from "./getConnectionDB.js";
import bcrypt from "bcryptjs";

async function insertPages(headline, subtitle) {
    let db
    try {
        db = await getConnectionDB()
        if (typeof headline === 'string' && typeof subtitle === 'string') {
            const sql = `
                INSERT INTO pages (headline, subtitle)
                VALUES (?, ?)
                `
            const result = await db.run(sql, [headline, subtitle])
            return result.lastID // Return the inserted page ID
        }
        return null
    } catch(err) {
        console.log(err)
        return null
    } finally {
        if (db) {
            await db.close()
        }
    }
    
}

async function insertContent(title, page_id) {
    let db
    try {
        db = await getConnectionDB()
        if (typeof title !== 'string') {
            throw new Error('Invalid title type')
        }
        const content = `
            INSERT INTO contents (page_id, title)
            VALUES (?, ?)
            `
        const result = await db.run(content, [page_id, title])
        return result.lastID // Return the inserted content ID
    } catch(err) {
        console.log(err)
        return null
    } finally {
        if (db) {
            await db.close()
        }
    }
}
async function insertParaf(content_id, ...paragraf) {
    let db
    try {
        db = await getConnectionDB()
        await db.exec('BEGIN TRANSACTION')
        const konten = `
            INSERT INTO paragraf (content_id, content)
            VALUES (?, ?)
        `
        for (let paraf of paragraf) {
            await db.run(konten, [content_id, paraf])
        }
        await db.exec('COMMIT')
    } catch(err) {
        if (db) {
            await db.exec('ROLLBACK')
        }
        console.log(err)
    } finally {
        if (db) {
            await db.close()
        }
    }
}
async function insertAcc(username, password) {
    let db
    try {
        const cryptpass =  await bcrypt.hash(password, 10)
        db = await getConnectionDB()
        if (typeof username !== 'string' || typeof password !== 'string') {
            throw new Error('Invalid username and password type')
        }
        const account = `
            INSERT INTO account (username, password)
            VALUES (?, ?)
        `
        await db.run(account, [username, cryptpass])
        return { success: true }
    } catch(err) {
        console.log('insertAcc error:', err)
        throw err
    } finally {
        if (db) {
            await db.close()
        }
    }
 
}

export { insertPages, insertContent, insertParaf, insertAcc }
