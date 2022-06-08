const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const heroSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categories: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    attack: {
      type: Number,
      required: true
    },
    defense: {
      type: Number,
      require: true
    },
    equipment: {
      weapon: String,
      shirt: String,
      trouser: String,
      hat: String,
    }
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
heroSchema.plugin(toJSON);
heroSchema.plugin(paginate);

heroSchema.statics.isNameTaken = async function (name, excludeHeroId) {
  const hero = await this.findOne({ name, _id: { $ne: excludeHeroId } });
  return !!hero;
};


const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
