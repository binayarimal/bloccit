const adQueries = require("../db/queries.ad.js");

module.exports = {
  index(req, res, next){
    adQueries.getAllAds((err, topics) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("advertisements/index", {topics});
      }
    })
  },
}
