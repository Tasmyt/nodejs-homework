const Joi = require('joi');
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");

const { httpError } = require("../errors");

const schema = Joi.object({    
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const getList = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw httpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
}

const postNewContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

const delContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const delContact = await removeContact(contactId);
    if (!delContact) {
       throw httpError(404, "Not found");
     }
    res.status(200).json(delContact);
  } catch (error) {
    next(error);
  }
}

const putChangeContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const { contactId } = req.params;
    const contactChange = await updateContact(contactId, req.body);
     if (!contactChange) {
       throw httpError(404, "Not found");
     }
    res.status(201).json(contactChange);
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getList,
    getContact,
    postNewContact,
    delContact,
    putChangeContact,
}