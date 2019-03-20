const topicQueries = require("../db/queries.topics.js");
const sequelize = require("../../src/db/models/index").sequelize;
 const Topic = require("../../src/db/models").Topic;
 module.exports = {
   index(req, res, next){


//#2
      topicQueries.getAllTopics((err, topics) => {

//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("topics/index", {topics});
        }
      })
   }
 }
