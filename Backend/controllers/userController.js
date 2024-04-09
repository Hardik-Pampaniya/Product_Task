const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailvalidator = require("email-validator");
const sequelize = require("../utils/sequelize");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    // Checking if the user exists
    const getUser = await sequelize.query(
      `SELECT * FROM users WHERE email = :email`,
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );

    // Checking if the user exists
    if (!getUser.length) {
      return res.status(400).json({ message: "wrong email" });
    }

    // Getting the hashed password from the database
    const hashedPassword = getUser[0].password;

    // Comparing the password
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
      return res.status(400).json({ message: "wrong password" });
    } else {
      const oneDayMilliseconds = 24 * 60 * 60 * 1000;
      return jwt.sign(
        {
          userId: getUser[0].userId,
          email: getUser[0].email,
          firstName: getUser[0].firstName,
          lastName: getUser[0].lastName,
          gender: getUser[0].gender,
          hobbies: getUser[0].hobbies,
          profile_pic: getUser[0].profile_pic,
          roleName: getUser[0].roleName,
        },
        process.env.JWT_SECRET,
        { expiresIn: oneDayMilliseconds },
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          return res.status(200).json({ message: "success", token });
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json(err);
  }
};


const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, gender, hobbies } = req.body;

  // Check if the file is uploaded
  let profile_pic = null;
  if (req.file) {
    profile_pic = req.file.filename;
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    !hobbies ||
    !profile_pic
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    if (!emailvalidator.validate(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    // Checking if the user already exists
    const getAuther = await sequelize.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      { type: QueryTypes.SELECT }
    );

    if (getAuther.length) {
      return res.status(400).json({ message: "email already exists" });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const roleName = "user";
    // Inserting data into the users database

    await sequelize.query(
      `INSERT INTO users (firstName, lastName, email, password, gender, hobbies, roleName, profile_pic) VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${gender}', '${hobbies}', '${roleName}', '${profile_pic}')`,
      { type: QueryTypes.INSERT }
    );

    const getUser = await sequelize.query(
      `SELECT userId FROM users WHERE email = '${email}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const userId = getUser[0].userId;

    await sequelize.query(
      `INSERT INTO roles (roleName, userId) VALUES ('${roleName}', '${userId}')`,
      { type: QueryTypes.INSERT }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {loginUser, logoutUser, registerUser};