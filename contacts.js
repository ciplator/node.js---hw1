const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join("./db/contacts.json");
const { nanoid } = require("nanoid");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function contactsList() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const rule = !contacts.some((contact) => contact.id === contactId);
  const contact = contacts.find((contact) => contact.id === contactId);
  return rule ? null : contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const indexRemove = contacts.findIndex((contact) => contact.id === contactId);
  if (indexRemove === -1) {
    return null;
  }
  const [removeItem] = contacts.splice(indexRemove, 1);
  await writeContacts(contacts);
  return removeItem;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

module.exports = { contactsList, getContactById, removeContact, addContact };