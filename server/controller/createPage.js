import { getConnectionDB } from "../db/getConnectionDB.js";

export const insertPage = async function(headline, subtitle, sections) {
    let db
    try {
        let page_id
        db = await getConnectionDB()
        await db.exec('BEGIN TRANSACTION')
        if (typeof headline !== 'string' || typeof subtitle !== 'string') {
            throw new Error('Invalid page data')
        }
        const sql = `
        INSERT INTO pages (headline, subtitle)
        VALUES (?, ?)
        `
        const pageResult = await db.run(sql, [headline, subtitle])
        page_id = pageResult.lastID

        for (const {title, paragraphs} of sections){
            if (!title || !Array.isArray(paragraphs)) continue

            const insertTitle = `
                INSERT INTO contents (title, page_id)
                VALUES (?, ?)
            `
            const contentResult = await db.run(insertTitle, [title, page_id])
            const content_id = contentResult.lastID

            const insertParaf = `
                INSERT INTO paragraf (content, content_id)
                VALUES (?, ?)
            `
            for (const p of paragraphs) {
                await db.run(insertParaf, [p, content_id])
            }
        }

        await db.exec('COMMIT')
        return page_id
    } catch(err) {
        await db.exec('ROLLBACK')
        console.log(err)
        return null
    } finally {
        if (db) {
            await db.close()
        }
    }
}