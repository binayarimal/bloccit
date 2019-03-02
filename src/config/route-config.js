module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const marco= require ("../routes/marco");

    app.use(marco);
      app.use(staticRoutes);

  }

}
