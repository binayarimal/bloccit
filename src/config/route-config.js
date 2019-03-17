module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const marco= require ("../routes/marco");
    const about = require("../routes/about");

    app.use(marco);
      app.use(staticRoutes);
       app.use(about);

  }

}
