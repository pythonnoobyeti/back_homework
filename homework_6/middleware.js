const validateFields = (req, res, next) => {
  const { title, description, authors, cover } = req.body;
  const isFieldOk = title && description && authors && cover;
  if (!isFieldOk) return next();
  req.validationOK = true;
  next();
};

export { validateFields };
