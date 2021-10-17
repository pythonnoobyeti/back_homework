const validateFields = (req, res, next) => {
  let { title, description, authors, cover } = req.body;
  const isFieldOk = title && description && authors && cover;
  if (!isFieldOk)
    return res.status(404).send("Check require fields in documentation.");
  if (Array.isArray(authors)) return next();
  req.body.authors = authors.split(",").map((item) => item.trim());
  next();
};

export { validateFields };
