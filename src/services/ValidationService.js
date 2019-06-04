const joi = require("@hapi/joi");
const InvaliDataError = require("../errors/InvalidData");
module.exports = {
  validateRegistrationForm: async (req, res, next) => {
    const schema = joi.object().keys({
      username: joi
        .string()
        .min(5)
        .max(15),
      password: joi
        .string()
        .min(6)
        .max(15),
      email: joi.string().regex(/^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/)
    });
    try {
      const result = await joi.validate(req.body, schema);
      return next();
    } catch (err) {
      eror = new InvaliDataError("Invalid Data");
      next(eror);
    }
  },
  validateLoginForm: async (req, res, next) => {
    const schema = joi.object().keys({
      email: joi.string().regex(/^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/),
      password: joi
        .string()
        .min(6)
        .max(15)
    });
    try {
      const result = await joi.validate(req.body, schema);
      return next();
    } catch (err) {
      // eror = new InvaliDataError("Invalid Data");
      next(err);
    }
  }
};
