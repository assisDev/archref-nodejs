const validate = (schemas) => {
  return (req, res, next) => {
    // Validação de headers
    if (schemas.headers) {
      const { error } = schemas.headers.validate(req.headers);
      if (error) return res.status(400).json({ message: error.message });
    }

    // Validação de params
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params);
      if (error) return res.status(400).json({ message: error.message });
    }

    // Validação de body
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
    }

    next(); // Se todas as validações passarem, prosseguir
  };
};

module.exports = validate;
