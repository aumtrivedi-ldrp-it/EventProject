'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_event = sequelize.define('tbl_event', {
    event_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    recurrence_every: DataTypes.STRING,
    recurrence_day: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN
  }, {});
  tbl_event.associate = function (models) {
    // associations can be defined here
  };
  return tbl_event;
};