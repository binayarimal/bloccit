const Topic = require("./models").Topic;

module.exports = {

  getTopic(id, callback){
    return Topic.findById(id)
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getAllTopics(callback){
    return Topic.all()
   .then((topics) => {
     callback(null, topics);
   })
   .catch((err) => {
     callback(err);
   })
 },
  addTopic(newTopic, callback){
       return Topic.create({
         title: newTopic.title,
         description: newTopic.description
       })
       .then((topic) => {
         callback(null, topic);
       })
       .catch((err) => {
         callback(err);
       })
     },
  deleteTopic(id, callback){
          return Topic.destroy({
            where: {id}
          })
          .then((topic) => {
            callback(null, topic);
          })
          .catch((err) => {
            callback(err);
          })
        },
  destroy(req, res, next){
            topicQueries.deleteTopic(req.params.id, (err, topic) => {
              if(err){
                res.redirect(500, `/topics/${topic.id}`)
              } else {
                res.redirect(303, "/topics")
              }
            });
          },
  updateTopic(id, updatedTopic, callback){
    return Topic.findById(id)
    .then((topic) => {
      if(!topic){
        return callback("Topic not found");
      }

//#1
      topic.update(updatedTopic, {
        fields: Object.keys(updatedTopic)
      })
      .then(() => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
