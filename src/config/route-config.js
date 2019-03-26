module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const marco= require ("../routes/marco");
    const about = require("../routes/about");
    const topicRoutes = require("../routes/topics");
    const advertisementRoutes = require("../routes/advertisements");
    const postRoutes = require("../routes/posts");
    app.use(marco);
    app.use(staticRoutes);
    app.use(about);
    app.use(topicRoutes);
    app.use(advertisementRoutes);
    app.use(postRoutes);

  }

}
