const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHero = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        categories: Joi.string().required(),
        attack: Joi.number().required(),
        defense: Joi.number().required(),
        equipment: Joi.object().keys({
            weapon: Joi.string(),
            shirt: Joi.string(),
            trouser: Joi.string(),
            hat: Joi.string(),
        })
    }),
};

const getHeros = {
  query: Joi.object().keys({
    name: Joi.string(),
    categories: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHero = {
  params: Joi.object().keys({
    heroId: Joi.string().custom(objectId),
  }),
};

const updateHero = {
  params: Joi.object().keys({
    heroId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name: Joi.string(),
        categories: Joi.string(),
        attack: Joi.number(),
        defense: Joi.number(),
        equipment: Joi.object().keys({
            weapon: Joi.string(),
            shirt: Joi.string(),
            trouser: Joi.string(),
            hat: Joi.string(),
        })
    })
    .min(1),
};

const deleteHero = {
  params: Joi.object().keys({
    heroId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createHero,
  getHeros,
  getHero,
  updateHero,
  deleteHero,
};

