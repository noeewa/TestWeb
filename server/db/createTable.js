import { getConnectionDB } from "./getConnectionDB.js";

function isValidTableName(name) {
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)
}
//Halaman//
async function createGlobal() {
    let db
    try {
        db = await getConnectionDB()
        const sql = `CREATE TABLE IF NOT EXISTS pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            headline TEXT NOT NULL,
            subtitle TEXT NOT NULL
        )`
        await db.exec(sql) // global
        // memiliki = konten yang dipegang
        console.log("database Log: Pages table created")
    } catch(err) {
        console.log(err)
    } finally {
        if (db) {
            await db.close()
        }
        console.log("database Log: Selesai")
    }
}
//Tiap page satu tabel metadata, satu tabel kontent
async function createContentPage() {
    let db
    try {
        db = await getConnectionDB()
        
        const sql = `CREATE TABLE IF NOT EXISTS contents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page_id INTEGER,
            title TEXT NOT NULL,
            FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
        )`
        await db.exec(sql)
        //pemilik = halaman pemegang
        console.log("database Log: Contents table created")
    } catch(err) {
        console.log(err)
    } finally {
        if (db) {
            await db.close()
        }
        console.log("database Log: Tabel Selesai")
    }
}

async function createParagrafPage() {
    let db
    try {
        db = await getConnectionDB()
        
        const sql = `CREATE TABLE IF NOT EXISTS paragraf (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content_id INTEGER,
            content TEXT NOT NULL,
            FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE
        )`
        await db.exec(sql)
        //pemilik = halaman pemegang
        console.log("database Log: Paragraf table created")
    } catch(err) {
        console.log(err)
    } finally {
        if (db) {
            await db.close()
        }
        console.log("database Log: Content Tabel Selesai")
    }
}
async function createAcc() {
    let db
    try {
        db = await getConnectionDB()
        const sql = `CREATE TABLE IF NOT EXISTS account (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`
        await db.exec(sql)
        console.log("database Log: Account table created")
    } catch(err) {
        console.log(err)
    } finally {
        if (db) {
            await db.close()
        }
    }
}

export { createGlobal, createContentPage, createParagrafPage, createAcc }
