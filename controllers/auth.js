const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { ctrlWrapper } = require("../helper");
const HttpError = require("../helper/HttpError");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const {subscription} = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({ user: {email: email, subscription: subscription} });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  
  const payload = {
    id: user._id,    
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  const { subscription } = user;
  res.status(200).json({ token: token, user: {email: email, subscription: subscription} });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateSubscription = async (req, res) => {
    const { _id, } = req.user;
    const {subscription} = await User.findByIdAndUpdate(_id, req.body, {new: true});
    res.status(200).json({subscription: subscription})
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
