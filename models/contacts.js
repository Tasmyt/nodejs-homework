const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contactDel = data.find((item) => item.id === contactId);
  if (!contactDel) return null;
  const contactsFilter = data.filter((item) => item.id !== contactId);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsFilter, null, 2),
    "utf-8"
  );
  return contactDel;
}

async function addContact(body) {
  const data = await listContacts();
  const contactData = {
    id: nanoid(),
    ...body,
  };
  data.push(contactData);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
  return contactData;
}

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const { name, email, phone } = body;
  const contact = data.find((contact) => {
    if (contact.id === contactId) {      
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      return contact;
    }    
  });  
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
