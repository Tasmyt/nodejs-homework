const Contact = require("../models/contact");

const HttpError = require("../helper/HttpError");
const ctrlWrapper = require("../helper/ctrlWrapper");

const getList = async (req, res) => {
  const { _id: owner } = req.user;  
  const {page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({owner},'', {skip, limit});
  res.json(contacts);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const postNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({...req.body, owner});
  res.status(201).json(newContact);
};

const delContact = async (req, res) => {
  const { contactId } = req.params;
  const delContact = await Contact.findByIdAndRemove(contactId);
  if (!delContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const putChangeContact = async (req, res) => {
  const { contactId } = req.params;
  const contactChange = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contactChange) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactChange);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const contactChange = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contactChange) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactChange);
};

module.exports = {
  getList: ctrlWrapper(getList),
  getContact: ctrlWrapper(getContact),
  postNewContact: ctrlWrapper(postNewContact),
  delContact: ctrlWrapper(delContact),
  putChangeContact: ctrlWrapper(putChangeContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
