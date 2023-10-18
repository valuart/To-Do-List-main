const Lista = require("../models").List;
const Item = require("../models").Item;
const Categoria = require("../models").Categoria;

//ENVIAR EL USER A CADA VISTA PARA INSERTAR EL USUARIO EN CADA LISTA
exports.agregarCategoria = function (req, res) {
  if (req.user[0]) {
    console.log("dentro de if undefinied :    *****" + req.user[0]);
    req.user = req.user[0];
  }
  console.log(req.user);
  res.render("categoria/formCategoria", {
    title: "Agregar categoria",
    form: true,
    pretty: true,
    user: req.user,
  });
  res.end();
};

exports.createCategoria = async function (req, res) {
  await Categoria.create({
    userId: req.body.userId,
    titulo: req.body.titulo,
  });
  res.redirect(301, "/categoria");
};

exports.updateCategoria = async function (req, res) {
  let categoria = await Categoria.findByPk(req.body.id);

  categoria.titulo = req.body.titulo;
  await categoria.save();
  res.redirect(301, req.get("referer"));
};

exports.deleteCategoria = async function (req, res) {
  console.log("***********************************");
  let categoria = await Categoria.findByPk(req.params.id);
  console.log(req.params.id);
  let listas = await categoria.getListas();
  // console.log(req.user);
  if (listas.length == 0) {
    console.log("entro aca");
    await categoria.destroy();
  } else {
    console.log("No se puede borrar una categoria que contenga listas");
    res.render("categoria/categorias", {
      pretty: true,
      alert: true,
      alertTitle: "Error",
      alertMessage:
        "No se puede borrar  una categoria que contenga listas. Por favor verificar",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: 5000,
      ruta: "lista",
      user: req.user,
    });
  }
  res.redirect(301, "/categoria"); //
  //res.redirect(301, req.get("referer")); //parentesis del resredirect que
};

exports.verCategorias = async function (req, res) {
  if (req.user[0]) {
    console.log("dentro de if undefinied :    *****" + req.user[0]);
    req.user = req.user[0];
  }
  let categoria = await Categoria.findAll();
  // { where: { userId: req.user.id } });
  res.render("categoria/categorias", {
    pretty: true,
    title: "Categorias",
    categorias: categoria,
    user: req.user,
  });
};


