const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");
const {
  validateAddContactBody,
  validateUpdateContactBody,
  validateUpdateContactStatus,
} = require("../../utils/validateBody");
const { schemas } = require("../../models/contact");

const { isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateAddContactBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateUpdateContactBody(schemas.updateSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateUpdateContactStatus(schemas.updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
