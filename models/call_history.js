'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CallHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CallHistory.init({
    roomId: DataTypes.STRING,
    userId: DataTypes.STRING,
    userName: DataTypes.STRING,
    callStartedAt: DataTypes.DATE,
    callEndAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'call_history',
  });
  return CallHistory;
};