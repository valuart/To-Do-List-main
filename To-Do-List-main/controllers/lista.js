const Lista = require("../models").List;
const Item = require("../models").Item;
const Categoria = require("../models").Categoria;

//ENVIAR EL USER A CADA VISTA PARA INSERTAR EL USUARIO EN CADA LISTA
exports.agregarLista = async function (req, res) {
  // console.log(req.user);
    if (req.user[0]) {
      console.log("dentro de if undefinied :    *****" + req.user[0]);
      req.user = req.user[0];
    }
  let categoria = await Categoria.findAll(); //{ where: { userId: req.user.id } });
  console.log(categoria);
  res.render("lista/formLista", {
    title: "AGREGAR LISTA",
    form: true,
    categoria: categoria,
    item: false,
    pretty: true,
    user: req.user,
  });
  res.end();
};

exports.createLista = async function (req, res) {
  let categoria = req.body.categoria;
  console.log(categoria);
  if (!categoria || categoria == 0) {
    categoria = null;
  }
  await Lista.create({
    userId: req.body.userId,
    titulo: req.body.titulo,
    estado: req.body.estado,
    categoriaId: categoria,
   
  });
  res.redirect(301, "/lista");
};

exports.updateLista = async function (req, res) {
  let lista = await Lista.findByPk(req.body.id);

  (lista.titulo = req.body.titulo), (lista.estado = req.body.estado);
  lista.categoriaId = req.body.categoria;
  console.log(req.body.fecha_resolucion);
  if (req.body.fecha_resolucion !== "") {
    lista.fecha_resolucion = req.body.fecha_resolucion;
  }
  await lista.save();
  res.redirect(301, req.get("referer"));
};

exports.deleteLista = async function (req, res) {
  console.log("***********************************");
  let lista = await Lista.findByPk(req.body.id);
  // , { include: Item });
  let items = await lista.getItems();
  console.log(req.user);
  if (lista.estado === "Resuelta" || items.length == 0) {
    console.log("entro aca");
    await lista.destroy();
  } else {
    console.log(
      "No se puede borrar una lista que no esta 'Resuelto' o contenga items"
    );
    res.render("lista/listaListas", {
      pretty: true,
      categoria: false,
      alert: true,
      alertTitle: "Error",
      alertMessage:
        "No se puede borrar listas que no esten resueltas o que contengan items. Por favor verificar",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: 5000,
      ruta: "lista",
      user: req.user,
    });
  }
  res.redirect(301, "/lista"); //
  //res.redirect(301, req.get("referer")); //parentesis del resredirect que
};

exports.verListas = async function (req, res) {
    if (req.user[0]) {
      console.log("dentro de if undefinied :    *****" + req.user[0]);
      req.user = req.user[0];
    }
  let lista = await Lista.findAll({ where: { userId: req.user.id } });
  let categoria = await Categoria.findAll();

  // ESTO PARA  ASIGNARLE LA PROPIEDAD CATEGORIA.TITULO  AL ITEM PARA  RENDERIZARLO
  lista.forEach((list) => {
    let catLista = categoria.filter((cat) => cat.id === list.categoriaId);
    if (catLista[0]) {
      // console.log(listaItem[0].titulo);
      list.categoria_titulo = catLista[0].titulo;
    }
  });
  res.render("lista/listaListas", {
    pretty: true,
    title: "VER LISTAS",
    listas: lista,
    categoria: categoria,
    item: false,
    modificar: true,
    user: req.user,
  });
};

// GET ITEMS
exports.verItemsLista = async function (req, res) {
    if (req.user[0]) {
      console.log("dentro de if undefinied :    *****" + req.user[0]);
      req.user = req.user[0];
    }
  let items = await Item.findAll({
    order: [["createdAt", "DESC"]],
    where: { userId: req.user.id, listId: req.params.id },
  });
  let listas = await Lista.findAll({ where: { id: req.params.id } });
  console.log("lista nombre del query" + listas[0].titulo);
  // ESTO PARA  ASIGNARLE LA PROPIEDAD LISTA.TITULO  AL ITEM PARA  RENDERIZARLO
  items.forEach((item) => {
    let listaItem = listas.filter((lista) => lista.id === item.listId);

    if (listaItem[0]) {
      // console.log(listaItem[0].titulo);
      item.lista_titulo = listaItem[0].titulo;
    }
  });
  // console.log(items);
  res.render("lista/itemsDeLista", {
    items: items,
    listaIt: listas[0],
    listas: listas,
    title: "Items",
    pretty: true,
    user: req.user,
  });
  res.end();
  console.log("llego a res end de lista de items");
};
