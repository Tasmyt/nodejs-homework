const express = require("express");
const ctrl = require('../../controllers/contactsControllers');

const router = express.Router();

router.get("/", ctrl.getList);

router.get("/:contactId", ctrl.getContact);

router.post("/", ctrl.postNewContact);

router.delete("/:contactId", ctrl.delContact);

router.put("/:contactId", ctrl.putChangeContact);

module.exports = router;
