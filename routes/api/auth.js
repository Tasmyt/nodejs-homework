const express = require("express");
const ctrl = require('../../controllers/auth');
const { validateBody, authenticate, isValidid } = require('../../middlewares');
const { shemas } = require('../../models/user');
const validateSubscription = require("../../middlewares/validateSubscription");

const router = express.Router();

router.post('/register', validateBody(shemas.registerShema), ctrl.register);
router.post('/login', validateBody(shemas.loginShema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch("/users", authenticate, validateSubscription(shemas.subscriptionShema), ctrl.updateSubscription);


module.exports = router;