import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("NO Connection string given");
}
const client = postgres(connectionString);
const db = drizzle(client);

export default db;
