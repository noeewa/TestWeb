import { getConnectionDB } from "./getConnectionDB.js";

function isValidTableName(name) {
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)
}

//Halaman//
async function createGlobal() {
    try {
        const db = getConnectionDB()
        await db`CREATE TABLE IF NOT EXISTS pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            headline TEXT NOT NULL,
            subtitle TEXT NOT NULL
        )`;
        
        console.log("database Log: Pages table created")
    } catch(err) {
        console.log(err)
    }
}

//Tiap page satu tabel metadata, satu tabel kontent
async function createContentPage() {
    try {
        const db = getConnectionDB()
        
        await db`CREATE TABLE IF NOT EXISTS contents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page_id INTEGER,
            title TEXT NOT NULL,
            FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
        )`;
        //pemilik = halaman pemegang
        console.log("database Log: Contents table created")
    } catch(err) {
        console.log(err)
    }
}

async function createParagrafPage() {
    try {
        const db = getConnectionDB()
        
        await db`CREATE TABLE IF NOT EXISTS paragraf (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content_id INTEGER,
            content TEXT NOT NULL,
            FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE
        )`;
        //pemilik = halaman pemegang
        console.log("database Log: Paragraf table created")
    } catch(err) {
        console.log(err)
    }
}

async function createAcc() {
    try {
        const db = getConnectionDB()
        await db`CREATE TABLE IF NOT EXISTS account (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`;
        console.log("database Log: Account table created")
    } catch(err) {
        console.log(err)
    }
}

export { createGlobal, createContentPage, createParagrafPage, createAcc }
