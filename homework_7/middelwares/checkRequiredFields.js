import requiredFields from "../requiredFields.js";

const checkRequiredFields = (req, res, next) => {
  let allFields = {
    ...req?.body,
    ...req?.file,
  };

  if (req.file) allFields.cover = req.file.filename;

  let isFieldOk = true;
  for (let key of Object.keys(requiredFields)) {
    if (!(key in allFields)) {
      isFieldOk = false;
      break;
    }
  }

  if (!isFieldOk)
    return res.status(404).send("Check require fields in documentation.aa");
  next();
};

export { checkRequiredFields };
