const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { equipService } = require('../services');

const createEquip = catchAsync(async (req, res) => {
  const equip = await equipService.createEquip(req.body);
  res.status(httpStatus.CREATED).send(equip);
});

const getEquips = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'categories']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await equipService.queryEquips(filter, options);
  res.send(result);
});

const getEquip = catchAsync(async (req, res) => {
  const equip = await equipService.getEquipById(req.params.equipId);
  if (!equip) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Equip not found');
  }
  res.send(equip);
});

const updateEquip = catchAsync(async (req, res) => {
  const equip = await equipService.updateEquipById(req.params.equipId, req.body);
  res.send(equip);
});

const deleteEquip = catchAsync(async (req, res) => {
  await equipService.deleteEquipById(req.params.equipId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEquip,
  getEquips,
  getEquip,
  updateEquip,
  deleteEquip,
};
