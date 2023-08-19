const express = require("express");
const ctrl = require('../../controllers/contactsControllers');
const { validateBody } = require("../../middlewares");
const schemas  = require("../../shemas/contactsShema");

const router = express.Router();

router.get("/", ctrl.getList);

router.get("/:contactId", ctrl.getContact);

router.post("/", validateBody(schemas.schema), ctrl.postNewContact);

router.delete("/:contactId", ctrl.delContact);

router.put("/:contactId", validateBody(schemas.schema), ctrl.putChangeContact);

module.exports = router;
