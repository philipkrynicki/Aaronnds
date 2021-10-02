const Card = require("../models/card");

exports.getLabels = (req, res) => {
  res.status(200).json(req.card.labels);
}

exports.postLabel = (req, res) => {
  
  const newLabel = req.body.label
  if (!newLabel) {
      res.status(400).send('Label required')
    }
  if (newLabel) {
    if (req.card.labels.includes(req.body.label)) {
      res.send('Label already exists')
    }
    else {  
      req.card.labels.push(req.body.label);
      req.card.save((err, card) => {
      if (err) throw err;
      res.status(200).json(newLabel);
    })}
  }
}

exports.deleteLabel = (req, res) => {
  req.card.labels.pull(req.body.data)
  
  req.card.save((err, card) => {
    if (err) throw err;
    
    res.status(200).json(req.body.data);
  })
}