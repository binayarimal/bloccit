const express = require("express");
const router = express.Router();

router.get("/about", (req, res, next) => {
  res.send("About Us");
});

module.exports = router;
