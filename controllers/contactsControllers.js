const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");

const { httpError } = require("../helper/errors");
const ctrlWrapper = require('../helper/ctrlWrapper');

const getList = async (req, res) => {  
    const contacts = await listContacts();
    res.json(contacts); 
}

const getContact = async (req, res) => {  
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw httpError(404, "Not found");
    }
    res.json(contact);  
}

const postNewContact = async (req, res) => {      
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);  
}

const delContact = async (req, res) => {  
    const { contactId } = req.params;
    const delContact = await removeContact(contactId);
    if (!delContact) {
       throw httpError(404, "Not found");
     }
    res.status(200).json(delContact);
}

const putChangeContact = async (req, res) => {      
    const { contactId } = req.params;
    const contactChange = await updateContact(contactId, req.body);
     if (!contactChange) {
       throw httpError(404, "Not found");
     }
    res.status(201).json(contactChange);  
}

module.exports = {
    getList: ctrlWrapper(getList),
    getContact: ctrlWrapper(getContact),
    postNewContact: ctrlWrapper(postNewContact),
    delContact: ctrlWrapper(delContact),
    putChangeContact: ctrlWrapper(putChangeContact),
}