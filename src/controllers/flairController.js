const flairQueries = require("../db/queries.flairs.js");
module.exports = {

  new(req, res, next){
     res.render("flairs/new", {postId: req.params.postId});
   },
   create(req, res, next){
     let newFlair = {
       name: req.body.name,
       color: req.body.color,
       postId:req.params.postId
     };
     flairQueries.addFlair(newFlair, (err, flair) => {
       if(err){
         res.redirect(500, `/topics/:id/posts/${newFlair.postId}/flairs/new`);
       } else {
         res.redirect(303, `/topics/:id/posts/${newFlair.postId}/flairs/${flair.id}`);
       }
     });
   },
   show(req, res, next){

//#1
    flairQueries.getFlair(req.params.id, (err, flair) => {

//#2
      if(err || flair == null){
        res.redirect(404, "/");
      } else {
        res.render("flairs/show", {flair});
      }
    });
  },
  destroy(req, res, next){
     flairQueries.deleteFlair(req.params.id, (err, flair) => {
       if(err){
         res.redirect(500, `/flairs/${flair.id}`)
       } else {
         res.redirect(303, "/flairs")
       }
     });
   },
   edit(req, res, next){
     flairQueries.getFlair(req.params.id, (err, flair) => {
       if(err || flair == null){
         res.redirect(404, "/");
       } else {
         res.render("flairs/edit", {flair});
       }
     });
   },
   update(req, res, next){
      postQueries.updatePost(req.params.id, req.body, (err, post) => {
        if(err || post == null){
          res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.id}/edit`);
        } else {
          res.redirect(`/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.id}`);
        }
      });
    }

}
