exports.getLabels = (req, res) => {
  res.status(200).json(req.card.labels);
}