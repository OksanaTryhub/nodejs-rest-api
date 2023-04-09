const { isValidObjectId } = require("mongoose");

const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");
const ctrlWrapper = require("../utils/ctrlWrapper");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw HttpError(404);
  }
  const result = await Contact.findById(contactId);

  console.log(result);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw HttpError(404);
  }
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({
    message: "Contact deleted",
  });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw HttpError(404);
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw HttpError(404);
  } else if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw HttpError(404);
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
