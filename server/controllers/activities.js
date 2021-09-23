exports.getActivity = (req, res) => {
  res.status(200).json(req.card.activities)
}

exports.postActivity = (req, res) => {
  if (!req.body.newActivity) {
    res.status(400).send("No newActivity included in request")
    return res.end();
  } 

  req.card.activities.push(req.body.newActivity);

  req.card.save((err, card) => {
    if (err) next(err);
    res.status(200).json(card.activities);
  })
}