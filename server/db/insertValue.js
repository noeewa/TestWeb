import { getConnectionDB } from "./getConnectionDB.js";
import bcrypt from "bcryptjs";

async function insertPages(headline, subtitle) {
    try {
        const db = getConnectionDB()
        if (typeof headline === 'string' && typeof subtitle === 'string') {
            const [result] = await db`
                INSERT INTO pages (headline, subtitle)
                VALUES (${headline}, ${subtitle})
                RETURNING id
            `
            return result.id // Return the inserted page ID
        }
        return null
    } catch(err) {
        console.log(err)
        return null
    }
}

async function insertContent(title, page_id) {
    try {
        const db = getConnectionDB()
        if (typeof title !== 'string') {
            throw new Error('Invalid title type')
        }
        const [result] = await db`
            INSERT INTO contents (page_id, title)
            VALUES (${page_id}, ${title})
            RETURNING id
        `
        return result.id // Return the inserted content ID
    } catch(err) {
        console.log(err)
        return null
    }
}

async function insertParaf(content_id, ...paragraf) {
    try {
        const db = getConnectionDB()
        await db.begin(async (tx) => {
            for (let paraf of paragraf) {
                await tx`
                    INSERT INTO paragraf (content_id, content)
                    VALUES (${content_id}, ${paraf})
                `
            }
        })
    } catch(err) {
        console.log(err)
    }
}

async function insertAcc(username, password) {
    try {
        const cryptpass = await bcrypt.hash(password, 10)
        const db = getConnectionDB()
        if (typeof username !== 'string' || typeof password !== 'string') {
            throw new Error('Invalid username and password type')
        }
        const [result] = await db`
            INSERT INTO account (username, password)
            VALUES (${username}, ${cryptpass})
            RETURNING id
        `
        return { success: true, id: result.id }
    } catch(err) {
        console.log('insertAcc error:', err)
        throw err
    }
}

export { insertPages, insertContent, insertParaf, insertAcc }
