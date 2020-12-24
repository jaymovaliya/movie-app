const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: { type: String},
    imdb_score: { type: Number},
    genre: [{ type: String}],
    director: { type: String},
    popularity: { type: Number},
    createdBy: { type: String},
    updatedBy: { type: String}
}, { timestamps: true});

movieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movies', movieSchema, 'movies');