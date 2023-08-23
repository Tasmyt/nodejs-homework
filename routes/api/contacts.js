const express = require("express");
const ctrl = require('../../controllers/contactsControllers');
const { validateBody, validateFavorite, isValidid, authenticate} = require("../../middlewares");
const schemas  = require("../../models/contactsShema");

const router = express.Router();

router.get("/", authenticate, ctrl.getList);

router.get("/:contactId", authenticate, isValidid, ctrl.getContact);

router.post("/", authenticate, validateBody(schemas.schema), ctrl.postNewContact);

router.delete("/:contactId", authenticate, isValidid, ctrl.delContact);

router.put("/:contactId", authenticate, isValidid, validateBody(schemas.schema), ctrl.putChangeContact);

router.patch("/:contactId/favorite", authenticate, isValidid, validateFavorite(schemas.updateFavoriteShema), ctrl.updateFavorite);

module.exports = router;
