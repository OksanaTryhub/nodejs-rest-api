const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");
const { validateAddContactBody, validateUpdateContactBody } = require("../../utils/validateBody");
const { addSchema, updateSchema } = require("../../schemas/contacts-schemas");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateAddContactBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId", validateUpdateContactBody(updateSchema), ctrl.updateContactById);

module.exports = router;
