import { hashPassword } from "../../../utils/auth";
const Datastore = require("nedb-promises");
const dataStore = Datastore.create("data/users.db");

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input, password should be at least 7 characters long.",
    });
    return;
  }

  let existingUser;

  try {
    existingUser = await dataStore.findOne({ email: email });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Signing up failed, please try again later." });
    return;
  }

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    email,
    password: hashedPassword,
  };

  try {
    await dataStore.insert(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Signing up failed, please try again later." });
    return;
  }

  res.status(201).json({ message: "Created user!" });
}

export default handler;
