const validateFields = (req, res, next) => {
  const { title, description, authors, cover } = req.body;
  const isFieldOk = title && description && authors && cover;
  if (!isFieldOk)
    return res.status(404).send("Check require fields in documentation.");
  next();
};

export { validateFields };
