const HttpError = require("../helper/HttpError");

const validateSubscription = (shema) => {
  const validateError = (req, res, next) => {
    const { error } = shema.validate(req.body);
    const { subscription } = req.body;

    if (error) {
      
      if (!subscription) {
        res.status(400).json({ message: `missing field subscription` });
      }
      next(HttpError(400, error.message));
    }
    next();
  };
  return validateError;
};

module.exports = validateSubscription;