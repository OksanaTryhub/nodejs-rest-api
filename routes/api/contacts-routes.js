const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");
const {
  validateAddContactBody,
  validateUpdateContactBody,
  validateUpdateContactStatus,
} = require("../../utils/validateBody");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateAddContactBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId", validateUpdateContactBody(schemas.updateSchema), ctrl.updateContactById);
router.patch("/:contactId/favorite", validateUpdateContactStatus(schemas.updateStatusSchema), ctrl.updateStatusContact);

module.exports = router;
