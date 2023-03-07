import express from "express";
import {
  createUser,
  generateHashedPassword,
  getUserByName,
} from "../services/user.services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// SignUp APi

router.post("/signup", async function (request, response) {
  const { email, password } = request.body;
  // db.user.insertOne(data)

  const userFromDB = await getUserByName(email);
  console.log(userFromDB);

  if (userFromDB) {
    response.status(400).send({ Message: "Email is Already Exist" });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ Message: "Password mut be atleast 8 characters" });
  } else {
    const hashedPassword = await generateHashedPassword(password);
    const result = await createUser({
      email: email,
      password: hashedPassword,
    });
    response.send(result);
  }
});

// Login Api

router.post("/login", async function (request, response) {
  const { email, password } = request.body;
  // db.user.insertOne(data)

  const userFromDB = await getUserByName(email);
  console.log(userFromDB);

  if (!userFromDB) {
    response.status(401).send({ Message: "Invalid Credentials" });
  } else {
    // checking stored DB password and entered password is correct or not
    const storedDBPassword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);

    if (isPasswordCheck) {
      // JWT using here
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      response.send({ Message: "Successfull Login", token: token });
    } else {
      response.status(401).send({ Message: "Invalid Credentials" });
    }
  }
});
export default router;
