const card = require("../models/card");


exports.getLabels = (req, res) => {
  res.status(200).json(req.card.labels);
}

exports.postLabel = (req, res) => {
  const newLabel = req.body.label
  if (!newLabel) {
    res.status(400).send('label required')
    res.end()
  } 
  card.find({}, (err, card) =>{
    res.send(card)
  })
  // card.findById({_id: req.params.id}, (err, card) => {
  //   card.labels.push(newLabel);
  //   card.labels.save()
  //   res.status(200).send(newLabel + ' label was added')  
  // })
  
}

exports.deleteLabel = (req, res) => {
  card.findOneandDelete({_id: req.params.id}, (err, review) => {
    if (err) throw err;
    res.status(200).send(req.params.label + ' label deleted')
    res.end()
  })

}