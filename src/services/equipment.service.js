const httpStatus = require('http-status');
const { Equip } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a equip
 * @param {Object} equipBody
 * @returns {Promise<Equip>}
 */
const createEquip = async (equipBody) => {
  if (await Equip.isNameTaken(equipBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'name already taken');
  }
  return Equip.create(equipBody);
};

/**
 * Query for equips
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEquips = async (filter, options) => {
  const equips = await Equip.paginate(filter, options);
  return equips;
};

/**
 * Get equip by id
 * @param {ObjectId} id
 * @returns {Promise<Equip>}
 */
const getEquipById = async (id) => {
  return Equip.findById(id);
};

/**
 * Get equip by name
 * @param {string} name
 * @returns {Promise<Equip>}
 */
const getEquipByName = async (name) => {
  return Equip.findOne({ name });
};

/**
 * Update equip by id
 * @param {ObjectId} equipId
 * @param {Object} updateBody
 * @returns {Promise<Equip>}
 */
const updateEquipById = async (equipId, updateBody) => {
  const equip = await getEquipById(equipId);
  if (!equip) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Equip not found');
  }
  if (updateBody.name && (await Equip.isNameTaken(updateBody.name, equipId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'name already taken');
  }
  
  Object.assign(equip, updateBody);
  await equip.save();
  return equip;
};

/**
 * Delete equip by id
 * @param {ObjectId} equipId
 * @returns {Promise<Equip>}
 */
const deleteEquipById = async (equipId) => {
  const equip = await getEquipById(equipId);
  if (!equip) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Equip not found');
  }
  await equip.remove();
  return equip;
};

module.exports = {
  createEquip,
  queryEquips,
  getEquipById,
  getEquipByName,
  updateEquipById,
  deleteEquipById,
};
