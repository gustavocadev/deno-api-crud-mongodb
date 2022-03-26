import { MongoClient, config } from "../../deps.ts"

const { MONGODB_URI } = config()

const client = new MongoClient()

// console.log(MONGODB_URI ?? Deno.env.get("MONGODB_URI"))

await client.connect(MONGODB_URI ?? Deno.env.get("MONGODB_URI"))

console.log("Connecting! 🚀🌍")

export { client }
