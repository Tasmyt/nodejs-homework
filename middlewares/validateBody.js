const { httpError } = require("../helper/errors");

const validateBody = schema => {
    const validateError = (req, res, next) => {
      const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
        }
        next()
    }
    return validateError;
}

module.exports = validateBody;