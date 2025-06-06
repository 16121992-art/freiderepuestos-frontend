import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Registrar nuevo usuario
// @route   POST /api/users/register
// @access  Público
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("El usuario ya existe");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Datos inválidos del usuario");
  }
});

// @desc    Autenticar usuario y obtener token
// @route   POST /api/users/login
// @access  Público
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Correo o contraseña inválidos");
  }
});