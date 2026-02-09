import { getConnectionDB } from "../db/getConnectionDB.js"

export const getPages = async function() {
    try {
        const db = getConnectionDB()
        const pages = await db`SELECT id, headline, subtitle FROM pages ORDER BY id ASC`
        return pages
    } catch(err) {
        console.log(err)
        return []
    }
}

export const getPageById = async function(pageId) {
    try {
        const db = getConnectionDB()
        
        // Get page info
        const [page] = await db`
            SELECT id, headline, subtitle FROM pages WHERE id = ${pageId}
        `
        
        if (!page) return null
        
        // Get contents for this page
        const contents = await db`
            SELECT id, title FROM contents WHERE page_id = ${pageId}
        `
        
        // Get paragraphs for each content
        const sections = await Promise.all(
            contents.map(async (content) => {
                const parafs = await db`
                    SELECT content FROM paragraf WHERE content_id = ${content.id}
                `
                return {
                    title: content.title,
                    content: parafs.map(p => p.content).filter(c => c.trim() !== '')
                }
            })
        )
        
        return {
            id: page.id,
            headline: page.headline,
            subtitle: page.subtitle,
            sections
        }
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getAllPagesWithContents = async function() {
    try {
        const db = getConnectionDB()
        
        // Get all pages
        const pages = await db`
            SELECT id, headline, subtitle FROM pages ORDER BY id ASC
        `
        
        // For each page, get its contents and paragraphs
        const pagesWithContents = await Promise.all(
            pages.map(async (page) => {
                const contents = await db`
                    SELECT id, title FROM contents WHERE page_id = ${page.id}
                `
                
                const sections = await Promise.all(
                    contents.map(async (content) => {
                        const parafs = await db`
                            SELECT content FROM paragraf WHERE content_id = ${content.id}
                        `
                        return {
                            title: content.title,
                            content: parafs.map(p => p.content).filter(c => c.trim() !== '')
                        }
                    })
                )
                
                return {
                    id: page.id,
                    headline: page.headline,
                    subtitle: page.subtitle,
                    sections
                }
            })
        )
        
        return pagesWithContents
    } catch(err) {
        console.log(err)
        return []
    }
}
