const Ad = require("./models").advertisement;

module.exports = {

//#1
  getAllAds(callback){
    return Ad.all()

//#2
    .then((ads) => {
      callback(null, ads);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
