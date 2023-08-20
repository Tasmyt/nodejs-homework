const { httpError } = require("../helper/errors");

const validateFavorite = (schema) => {
  const validateError = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const { favorite } = req.body;

    if (error) {
      
      if (!favorite) {
        res.status(400).json({ message: `missing field favorite` });
      }
      next(httpError(400, error.message));
    }
    next();
  };
  return validateError;
};

module.exports = validateFavorite;