const express = require("express");
const ctrl = require('../../controllers/contactsControllers');
const { validateBody, validateFavorite, isValidid } = require("../../middlewares");
const schemas  = require("../../models/contactsShema");

const router = express.Router();

router.get("/", ctrl.getList);

router.get("/:contactId", isValidid, ctrl.getContact);

router.post("/", validateBody(schemas.schema), ctrl.postNewContact);

 router.delete("/:contactId", isValidid, ctrl.delContact);

router.put("/:contactId", isValidid, validateBody(schemas.schema), ctrl.putChangeContact);

router.patch("/:contactId/favorite", isValidid, validateFavorite(schemas.updateFavoriteShema), ctrl.updateFavorite);

module.exports = router;
