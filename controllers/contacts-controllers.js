const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");
const ctrlWrapper = require("../utils/ctrlWrapper");

const getAllContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({
    message: "Contact deleted",
  });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  } else if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
