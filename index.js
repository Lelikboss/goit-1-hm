// Імпорт модуля contacts.js
const contacts = require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");
program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const listContacts = await contacts.listContacts()
            console.table(listContacts);
            break;

        case "get":
            const getContact = await contacts.getContactById(id)
            getContact ? console.log(getContact) : console.log(getContact + '\nError: Contact not found');
            break;

        case "add":
            const addNewContact = await contacts.addContact({ name, email, phone })
            console.log(addNewContact);
            break;

        case "remove":
            const removeContact = await contacts.removeContact(id)
            removeContact ? console.log('Contact ', removeContact.name, ' deleted successfully!') : console.log(removeContact + '\nError: Contact not found');
            break;
        case "update":
            const updateContact = await contacts.updateContact(id, { name, email, phone })
            updateContact ? console.log(updateContact) : console.log(updateContact + '\nError: Contact not found');
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);