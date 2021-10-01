const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: String,
  description: String,
  activities: [String],
  labels: [String],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  list: {type: Schema.Types.ObjectId, ref: 'List'},
  position: Number
})

cardSchema.plugin(AutoIncrement, {id: 'card_position_seq', inc_field: 'position', reference_fields: ['list']});

cardSchema.pre('deleteOne', {document: false, query: true}, async function(next) {
  const card = await this.model.findOne(this.getFilter());
  card.model('Comment').deleteMany({card: card._id}, next); 
})

cardSchema.pre('deleteMany', {document: false, query: true}, async function(next) {
  const cards = await this.model.find(this.getFilter());

  const ids = cards.map(card => {
    return card._id;
  })

  cards[0].model('Comment').deleteMany({card: {'$in': ids}}, next);
})

module.exports = mongoose.model('Card', cardSchema);