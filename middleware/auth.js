import jwt from "jsonwebtoken";

// export this auth and use it after the user login use it in api after created front end api
const auth = (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    console.log(token, "token");
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    response.status(401).send({ message: err.message });
  }
};
