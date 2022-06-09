const httpStatus = require('http-status');
const { Hero } = require('../models');
const { Equip } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a hero
 * @param {Object} heroBody
 * @returns {Promise<Hero>}
 */
const createHero = async (heroBody) => {
  if (await Hero.isNameTaken(heroBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'name already taken');
  }
  return Hero.create(heroBody);
};

/**
 * Query for heros
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHeros = async (filter, options) => {
  const heros = await Hero.paginate(filter, options);
  return heros;
};

const populationEquip = async (hero) => {
    Hero
    .findById(hero._id)
    .populate("equipment.weapon")
    .populate("equipment.shirt")
    .exec(function (err, newHero) {
      if (err) return handleError(err);
      console.log(newHero)
      console.log(hero)
      return newHero;
    });
}

/**
 * Get hero by id
 * @param {ObjectId} id
 * @returns {Promise<Hero>}
 */
const getHeroById = async (id) => {
  return await Hero
        .findById(id)
        .populate({ 
          path: 'equipment',
          populate: [
            {
              path: 'weapon',
              model: 'Equip'
            },
            {
              path: 'shirt',
              model: 'Equip'
            }
          ]
       })

};

/**
 * Get hero by name
 * @param {string} name
 * @returns {Promise<Hero>}
 */
const getHeroByName = async (name) => {
  return Hero.findOne({ name });
};

/**
 * Update hero by id
 * @param {ObjectId} heroId
 * @param {Object} updateBody
 * @returns {Promise<Hero>}
 */
const updateHeroById = async (heroId, updateBody) => {
  const hero = await getHeroById(heroId);
  if (!hero) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hero not found');
  }
  if (updateBody.name && (await Hero.isNameTaken(updateBody.name, heroId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'name already taken');
  }

  Object.assign(hero, updateBody);
  await hero.save();
  return hero;
};

/**
 * Delete hero by id
 * @param {ObjectId} heroId
 * @returns {Promise<Hero>}
 */
const deleteHeroById = async (heroId) => {
  const hero = await getHeroById(heroId);
  if (!hero) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hero not found');
  }
  await hero.remove();
  return hero;
};

module.exports = {
  createHero,
  queryHeros,
  getHeroById,
  getHeroByName,
  updateHeroById,
  deleteHeroById,
  populationEquip
};
