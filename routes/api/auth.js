const express = require("express");
const ctrl = require('../../controllers/auth');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { shemas } = require('../../models/user');


const router = express.Router();

router.post('/register', validateBody(shemas.registerShema), ctrl.register);
router.post('/login', validateBody(shemas.loginShema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);
router.get('/verify/:verificationCode', ctrl.verifyEmail);
router.post('/verify', validateBody(shemas.emailShema), ctrl.resendVerifyEmail);

module.exports = router;