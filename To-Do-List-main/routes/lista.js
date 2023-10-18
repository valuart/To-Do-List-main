var express = require("express");
var listaCotroller = require("../controllers/lista");
var router = express.Router();
const authController = require("../controllers/authController");

/* GET home page. */
router.get(
  "/",
  authController.isAuthenticated,
  // authController.isAuthorizated(["User"]),
  listaCotroller.verListas
);
router.get("/listas", authController.isAuthenticated, listaCotroller.verListas);
router.get(
  "/itemsLista/:id",
  authController.isAuthenticated,
  listaCotroller.verItemsLista
);
router.get(
  "/agregarLista",
  authController.isAuthenticated,
  listaCotroller.agregarLista
);
router.post(
  "/createLista",
  authController.isAuthenticated,
  listaCotroller.createLista
);
router.post(
  "/updateLista",
  authController.isAuthenticated,
  listaCotroller.updateLista
);
router.post(
  "/deleteLista",
  authController.isAuthenticated,
  listaCotroller.deleteLista
);

module.exports = router;
