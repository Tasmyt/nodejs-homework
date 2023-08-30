const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require('nanoid');

const { User } = require("../models/user");
const { ctrlWrapper, sendEmail } = require("../helper");
const HttpError = require("../helper/HttpError");
const path = require("path");
const fs = require("fs/promises");

const { SECRET_KEY, BASE_URL } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const { subscription } = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email, subject: 'Verify email',
    html: `<a target='_blank' href='${BASE_URL}/users/verify/${verificationCode}'> Click verify email </a>`
  };

  await sendEmail(verifyEmail);

  res.status(201).json({ user: { email: email, subscription: subscription } });
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
  res
    .status(200)
    .json({ token: token, user: { email: email, subscription: subscription } });
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
  const { _id } = req.user;
  const { subscription } = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({ subscription: subscription });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tmpUpload, resultUpload);

  Jimp.read(resultUpload)
    .then((image) => {
      return image.cover(250, 250).write(resultUpload);
    })
    .catch((e) => {
      throw e;
    });
  const avatarURL = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    avatarURL: avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
