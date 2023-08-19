const { httpError } = require("../helper/errors");

const validateBody = (schema) => {
  const validateError = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const { name, email, phone } = req.body;

    if (error) {
      
      if (!name && !email && !phone) {
        res.status(400).json({ message: `Missing fields` });
      }
      next(httpError(400, error.message));
    }
    next();
  };
  return validateError;
};

module.exports = validateBody;
