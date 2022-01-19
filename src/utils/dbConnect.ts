import { MongoClient, config } from "../../deps.ts";


const client = new MongoClient();

await client.connect(config().MONGODB_URI);

console.log("connectado 🚀:D🌍👦");
  
const db = client.database("dataUsersDBTest");

export { db };
