const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEquip = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        attack: Joi.number().required(),
        defense: Joi.number().required()
    }),
};

const getEquips = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  }),
};

const getEquip = {
  params: Joi.object().keys({
    equipId: Joi.string().custom(objectId),
  }),
};

const updateEquip = {
  params: Joi.object().keys({
    equipId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name: Joi.string(),
        attack: Joi.number(),
        defense: Joi.number()
    })
    .min(1),
};

const deleteEquip = {
  params: Joi.object().keys({
    equipId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEquip,
  getEquips,
  getEquip,
  updateEquip,
  deleteEquip,
};

