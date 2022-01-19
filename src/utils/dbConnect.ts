import { MongoClient } from "../../deps.ts";

const client = new MongoClient();

await client.connect(
  "mongodb+srv://aprender-node:BAVgRFBrfeC5Chfj@cluster0.hwjc6.mongodb.net/dataUsersDBTest?authMechanism=SCRAM-SHA-1",
);

console.log("connectado 🚀:D🌍👦");
  
const db = client.database("dataUsersDBTest");

export { db };
