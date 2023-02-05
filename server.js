const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwtDecode = require("jwt-decode");

const { createToken } = require("./utils");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("auth: ", req.body);

    const emailValid = email === "test@gmail.com";
    const passwordValid = password === "testing123";

    if (!emailValid || !passwordValid) {
      return res.status(403).json({
        message: "Wrong email or password",
      });
    }

    const userInfo = { email };
    const token = createToken(userInfo);

    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;

    res.json({
      message: "Authentication successful!",
      token,
      userInfo,
      expiresAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong." });
  }
});

app.listen(3000, () => console.log("Server is up on port 3000"));
