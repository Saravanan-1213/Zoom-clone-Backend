import { client } from "../index.js ";
import bcrypt from "bcrypt";

// creating Hashed Password
export async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}
// db.user.insertOne(data);

export async function createUser(data) {
  return await client.db("b40wd").collection("user").insertOne(data);
}

// declaring userFromDB to find user is already exist or not
export async function getUserByName(email) {
  return await client.db("b40wd").collection("user").findOne({ email: email });
}
