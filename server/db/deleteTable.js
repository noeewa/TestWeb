import { getConnectionDB } from "./getConnectionDB.js";

async function deleteTable() {
    db = await getConnectionDB()
    
}