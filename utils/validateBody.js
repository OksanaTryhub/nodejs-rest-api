const { HttpError } = require("../helpers");

const validateUserBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

const validateUpdateContactBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

const validateUpdateContactStatus = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing field favorite"));
    }
    next();
  };
  return func;
};

const validateAddContactBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const missingFields = error.details.map((detail) => detail.context.key);
      const message = `Missing required ${missingFields.join(", ")} ${missingFields.length === 1 ? "field" : "fields"}`;
      next(HttpError(400, message));
    }
    next();
  };
  return func;
};

module.exports = {
  validateUserBody,
  validateUpdateContactBody,
  validateAddContactBody,
  validateUpdateContactStatus,
};
