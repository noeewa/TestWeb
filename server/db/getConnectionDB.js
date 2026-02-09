import { neon } from "@neondatabase/serverless";

export function getConnectionDB() {
    return neon(process.env.DATABASE_URL);
}