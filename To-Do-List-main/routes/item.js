var express = require("express");
var router = express.Router();
var itemCotroller = require("../controllers/item");
const authController = require("../controllers/authController");

/* GET users listing. */
/// poner la funcion de isAuthenticated en todas las rutas que se quiera proteger
router.get("/", authController.isAuthenticated, itemCotroller.listarItems);
router.get(
  "/agregarItem",
  authController.isAuthenticated,
  itemCotroller.crearItem
);
router.post(
  "/createItem",
  authController.isAuthenticated,
  itemCotroller.agregarItem
);
router.post(
  "/updateItem",
  authController.isAuthenticated,
  itemCotroller.updateItem
);
router.post(
  "/deleteItem",
  authController.isAuthenticated,
  itemCotroller.deleteItem
);

module.exports = router;
