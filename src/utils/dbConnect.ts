import { MongoClient } from "../../deps.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const client = new MongoClient();

await client.connect(config().MONGODB_URI);

console.log("connectado 🚀:D🌍👦");
  
const db = client.database("dataUsersDBTest");

export { db };
