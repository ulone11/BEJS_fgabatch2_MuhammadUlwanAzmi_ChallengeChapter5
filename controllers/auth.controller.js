const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Email and Password are required" });
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    const payload_token = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload_token, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      status: "success",
      message: "login successfull",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const authCheck = (req, res) => {
  try {
    // const token = req.header("Authorization");
    // console.log(token);
    res.json({ status: "success", message: "Authentication Success" });
  } catch (error) {
    res.status(500).json({ message: "Authentication Error" });
  }
};

module.exports = {
  loginUser,
  authCheck,
};
