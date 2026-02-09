import { getConnectionDB } from "../db/getConnectionDB.js";

export const insertPage = async function(headline, subtitle, sections) {
    try {
        if (typeof headline !== 'string' || typeof subtitle !== 'string') {
            throw new Error('Invalid page data')
        }

        const db = getConnectionDB()
        
        await db.begin(async (tx) => {
            // Insert page
            const [pageResult] = await tx`
                INSERT INTO pages (headline, subtitle)
                VALUES (${headline}, ${subtitle})
                RETURNING id
            `
            const page_id = pageResult.id

            for (const {title, paragraphs} of sections) {
                if (!title || !Array.isArray(paragraphs)) continue

                const [contentResult] = await tx`
                    INSERT INTO contents (title, page_id)
                    VALUES (${title}, ${page_id})
                    RETURNING id
                `
                const content_id = contentResult.id

                for (const p of paragraphs) {
                    await tx`
                        INSERT INTO paragraf (content, content_id)
                        VALUES (${p}, ${content_id})
                    `
                }
            }
        })

        return { success: true }
    } catch(err) {
        console.log(err)
        return null
    }
}
