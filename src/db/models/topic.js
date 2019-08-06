'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: {
         type: DataTypes.STRING,
         allowNull: false
       },
    description: {
            type: DataTypes.STRING,
            allowNull: false
          },
  }, {});
  Topic.associate = function(models) {

    Topic.hasMany(models.Rule, {
      foreignKey: "topicId",
      as: "rules",
    });
    Topic.hasMany(models.Post, {
      foreignKey: "topicId",
      as: "posts",
    });
  };


  return Topic;
};
