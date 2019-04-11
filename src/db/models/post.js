'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type:DataTypes.STRING,
      allowNull: false},
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {});
    Post.associate = function(models) {
      // associations can be defined here
      Post.hasMany(models.Flair, {
        foreignKey: "postId",
        as: "flairs"
      });
      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments"
      });
      Post.hasMany(models.Vote, {
        foreignKey: "postId",
        as: "votes"
      });
      Post.hasMany(models.Favorite, {
        foreignKey: "postId",
        as: "favorites"
      });
      Post.afterCreate((post, callback) => {
     return models.Favorite.create({
       userId: post.userId,
       postId: post.id
     });

   });
   Post.afterCreate((post, callback) => {
  return models.Vote.create({
    value:1,
    userId: post.userId,
    postId: post.id
  });

});




      Post.belongsTo(models.Topic, {
        foreignKey: "topicId",
        onDelete: "CASCADE"
      });
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
    };
    Post.prototype.getPoints = function(){

      // #1
      if(this.votes.length === 0) return 0

      // #2
      return this.votes
      .map((v) => { return v.value })
      .reduce((prev, next) => { return prev + next });
    };
    Post.prototype.hasUpvoteFor = function(userId){
      const vote = this.votes.filter(v => v.userId===userId);

      if (vote[0]){
        if(vote[0].value === 1){return true}
      }
      else {return "doesn't have an upVote"}
    };
    Post.prototype.hasDownvoteFor = function(userId){
      const vote = this.votes.filter(v => v.userId===userId);
      if (vote[0]){
        if(vote[0].value === -1){return true}
      } else {return "doesn't have a downVote"}
    };
    Post.prototype.getFavoriteFor = function(userId){
    return this.favorites.find((favorite) => { return favorite.userId == userId });
  };

    return Post;
  };
