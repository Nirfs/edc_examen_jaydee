const { body, validationResult } = require("express-validator");
const BadRequestError = require("./errors/BadRequestError");

const VALID_PRIORITIES = ["low", "medium", "high"];

const validateTask = [
  body("title")
    .exists()
    .withMessage("title est requis")
    .isString()
    .withMessage("title doit être une chaîne")
    .notEmpty()
    .withMessage("title ne peut pas être vide"),

  body("description")
    .exists()
    .withMessage("description est requis")
    .isString()
    .withMessage("description doit être une chaîne"),

  body("columnKey")
    .exists()
    .withMessage("columnKey est requis")
    .isString()
    .withMessage("columnKey doit être une chaîne")
    .notEmpty()
    .withMessage("columnKey ne peut pas être vide"),

  body("taskType")
    .exists()
    .withMessage("taskType est requis")
    .isString()
    .withMessage("taskType doit être une chaîne")
    .notEmpty()
    .withMessage("taskType ne peut pas être vide"),

  body("taskTypecolor")
    .exists()
    .withMessage("taskTypecolor est requis")
    .isString()
    .withMessage("taskTypecolor doit être une chaîne")
    .notEmpty()
    .withMessage("taskTypecolor ne peut pas être vide"),

  body("priority")
    .exists()
    .withMessage("priority est requis")
    .isIn(VALID_PRIORITIES)
    .withMessage(
      `priority doit être l'une des valeurs : ${VALID_PRIORITIES.join(", ")}`,
    ),

  body("priorityColor")
    .exists()
    .withMessage("priorityColor est requis")
    .isString()
    .withMessage("priorityColor doit être une chaîne")
    .notEmpty()
    .withMessage("priorityColor ne peut pas être vide"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg));
    }

    next();
  },
];

module.exports = validateTask;
