const Contact = require('../models/contact');

const { httpError } = require("../helper/errors");
const ctrlWrapper = require('../helper/ctrlWrapper');

const getList = async (req, res) => {  
    const contacts = await Contact.find();
    res.json(contacts); 
}

 const getContact = async (req, res) => {  
     const { contactId } = req.params;
     const contact = await Contact.findById(contactId);
     if (!contact) {
       throw httpError(404, "Not found");
     }
     res.json(contact);  
 }

const postNewContact = async (req, res) => {      
 const newContact = await Contact.create(req.body);
res.status(201).json(newContact);  
}

const delContact = async (req, res) => {  
     const { contactId } = req.params;
     const delContact = await Contact.findByIdAndRemove(contactId);
     if (!delContact) {
        throw httpError(404, "Not found");
      }
     res.status(200).json({message: "contact deleted"});
 }

 const putChangeContact = async (req, res) => {      
     const { contactId } = req.params;
     const contactChange = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!contactChange) {
        throw httpError(404, "Not found");
      }
     res.status(200).json(contactChange);       
 }

const updateFavorite = async (req, res) => {      
     const { contactId } = req.params;
     const contactChange = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!contactChange) {
        throw httpError(404, "Not found");
      }
     res.status(200).json(contactChange);       
 }

module.exports = {
    getList: ctrlWrapper(getList),
    getContact: ctrlWrapper(getContact),
    postNewContact: ctrlWrapper(postNewContact),
    delContact: ctrlWrapper(delContact),
  putChangeContact: ctrlWrapper(putChangeContact),
    updateFavorite: ctrlWrapper(updateFavorite),
}