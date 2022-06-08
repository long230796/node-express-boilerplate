const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { heroService } = require('../services');

const createHero = catchAsync(async (req, res) => {
  const hero = await heroService.createHero(req.body);
  res.status(httpStatus.CREATED).send(hero);
});

const getHeros = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'categories']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await heroService.queryHeros(filter, options);
  res.send(result);
});

const getHero = catchAsync(async (req, res) => {
  const hero = await heroService.getHeroById(req.params.heroId);
  if (!hero) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hero not found');
  }
  res.send(hero);
});

const updateHero = catchAsync(async (req, res) => {
  const hero = await heroService.updateHeroById(req.params.heroId, req.body);
  res.send(hero);
});

const deleteHero = catchAsync(async (req, res) => {
  await heroService.deleteHeroById(req.params.heroId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHero,
  getHeros,
  getHero,
  updateHero,
  deleteHero,
};
