const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../../utils/sequelize");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    // Checking if the user exists
    const getUser = await sequelize.query(
      `SELECT email, userId, roleName, password FROM users WHERE email = :email`,
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );
    // console.log(getUser)

    // Checking if the user exists
    // if (!getUser.length) {
    //   return res.status(400).json({ message: "wrong email" });
    // }
    

    // Getting the hashed password from the database
    const hashedPassword = getUser[0].password;

    // Comparing the password
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
      return res.status(400).json({ message: "wrong password" });
    } else {
      jwt.sign(
        // {
        //   userId: getUser[0].userId,
        //   email: getUser[0].email,
        //   profilePic: getUser[0].profilePic,
        //   roleName: getUser[0].roleName,
        // },
        getUser[0],
        process.env.JWT_SECRET,
        // 'asdfasfsafsafd',
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            // console.log(token);
            return res.status(500).json({ message: err.message });
          }
          res.status(200).json({ message: "success", token });
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = loginUser;
