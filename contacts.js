const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const data = contacts.find((contact) => contact.id === contactId);
  return data || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const data = contacts.splice(index, 1);
  return data;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(contacts);
}

addContact("Ela", "Ela@mail.com", "19452656");
