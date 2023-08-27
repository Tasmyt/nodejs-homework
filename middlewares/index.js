const validateBody = require('./validateBody');
const isValidid = require('./isValidid');
const validateFavorite = require('./validateFavorite');
const authenticate = require('./authenticate');
const upload = require("./upload")

module.exports = {
    validateBody,
    isValidid,
    validateFavorite,
    authenticate,
    upload,
}