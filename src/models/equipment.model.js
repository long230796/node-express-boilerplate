const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const equipSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    attack: {
      type: Number,
      required: true
    },
    defense: {
      type: Number,
      require: true
    }
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
equipSchema.plugin(toJSON);
equipSchema.plugin(paginate);

equipSchema.statics.isNameTaken = async function (name, excludeEquipId) {
  const equip = await this.findOne({ name, _id: { $ne: excludeEquipId } });
  return !!equip;
};


const Equip = mongoose.model('Equip', equipSchema);

module.exports = Equip;
