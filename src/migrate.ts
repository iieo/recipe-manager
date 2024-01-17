import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";


const databaseUrl = drizzle(postgres(database_url, { ssl: "require", max: 1 }));

const main = async () => {
  try {
    await migrate(databaseUrl, { migrationsFolder: "migrations" });
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

/* eslint-disable @typescript-eslint/no-empty-function */
main()
  .then(() => {})
  .catch(() => {});
