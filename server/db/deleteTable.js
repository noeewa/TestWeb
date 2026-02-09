import { getConnectionDB } from "./getConnectionDB.js";

async function deleteTable() {
    try {
        const db = getConnectionDB()
        // Add your delete logic here using tagged template literals
        // Example: await db`DELETE FROM table_name WHERE condition`
        console.log("deleteTable function ready")
    } catch(err) {
        console.log(err)
    }
}

export { deleteTable }
