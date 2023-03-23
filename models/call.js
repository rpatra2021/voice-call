'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Call extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Call.hasMany(models.call_history, {as : 'callUsers', foreignKey:'callId', constraints:false})
    }
  }
  Call.init({
    roomId: DataTypes.STRING,
    callStartedAt: DataTypes.DATE,
    callEndAt: DataTypes.DATE,
    status: DataTypes.STRING //status = active, complete
  }, {
    sequelize,
    modelName: 'call',
  });
  return Call;
};