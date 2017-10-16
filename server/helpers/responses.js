let responses = function(data, status, res) {
  return res.status(status).json(data);
};

module.exports = responses;