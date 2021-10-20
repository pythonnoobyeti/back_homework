import requiredFields from "../requiredFields.js";

const validateFields = (req, res, next) => {
  // Простая тупая валидация, скажи мне, пожалуйста, как правильно
  let allFields = {
    ...req?.body,
    ...req?.file,
  };

  if (req.file) allFields.cover = req.file.filename;

  let isFieldOk = true;
  for (let key of Object.keys(requiredFields)) {
    if (key in allFields) {
      if (
        !requiredFields[key].includes(typeof allFields[key]) ||
        allFields[key].length === 0
      ) {
        isFieldOk = false;
      }
    }
  }

  if (!isFieldOk)
    return res.status(404).send("Check require fields in documentation.");

  if (!Array.isArray(allFields.authors) && allFields.authors != undefined) {
    req.body.authors = allFields.authors.split(",").map((item) => item.trim());
  }

  next();
};

export { validateFields };
