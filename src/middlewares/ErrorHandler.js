module.exports = {
  handleError: (err, req, res, next) => {
    res
      .status(err.code || 500)
      .send({ message: err.message || "Something doesnt work" });
  }
};
