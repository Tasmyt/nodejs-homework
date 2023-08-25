const express = require("express");
const ctrl = require('../../controllers/auth');
const { authenticate } = require('../../middlewares');
const { shemas } = require('../../models/user');
const validateSubscription = require("../../middlewares/validateSubscription");

const router = express.Router();

router.patch("/users", authenticate, validateSubscription(shemas.subscriptionShema), ctrl.updateSubscription);

module.exports = router;