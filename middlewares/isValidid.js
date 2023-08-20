const { isValidObjectId } = require('mongoose');
const { httpError } = require('../helper/errors');
const isValidid = (req, res, next) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
        next(httpError(400, `${id} is not valid id`))
    }
    next();
}

module.exports = isValidid;