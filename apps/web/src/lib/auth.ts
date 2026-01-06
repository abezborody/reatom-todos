import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({ 
        connectionString: import.meta.env.VITE_SUPABASE_URL
    }),
});