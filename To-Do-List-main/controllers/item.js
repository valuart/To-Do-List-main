const Item = require("../models").Item;
const Lista = require("../models").List;

// GET ITEMS
exports.listarItems = async function (req, res) {
  console.log("istarItems :    *****" + req.user[0]);
  if (req.user[0]) {
    console.log("dentro de if undefinied :    *****" + req.user[0]);
    req.user = req.user[0];
  }

  let items = await Item.findAll({
    order: [["createdAt", "DESC"]],
    where: { userId: req.user.id },
  });
  let listas = await Lista.findAll({ where: { userId: req.user.id } });

  // ESTO PARA  ASIGNARLE LA PROPIEDAD LISTA.TITULO  AL ITEM PARA  RENDERIZARLO
  items.forEach((item) => {
    let listaItem = listas.filter((lista) => lista.id === item.listId);
  
    if (listaItem[0]) {
      // console.log(listaItem[0].titulo);
      item.lista_titulo = listaItem[0].titulo;
    } else {
      // console.log("Sin lista para item");
    }
    // console.log(
    //   "#####################################################################################"
    // );
  });
  // console.log(items);
  res.render("item/listarItem_edit", {
    items: items,
    listas: listas,
    title: "Items",
    pretty: true,
    user: req.user,
  });
  res.end();
  console.log("llego a res end de lista de items");
};

exports.crearItem = async function (req, res) {
  console.log("crear item");
  // console.log(req.user[0].id);
  if (req.user[0]) {
    console.log("dentro de if undefinied :    *****" + req.user[0]);
    req.user = req.user[0];
  }
  let lista = await Lista.findAll({ where: { userId: req.user.id } });
  //  await Lista.findAll({
  //   where: {
  //     estado: ["Pendiente", "En proceso"],
  //   },
  // });

  console.log(lista);
  res.render("item/formItem", {
    title: "Agregar Tarea",
    form: true,
    modificar: false,
    item: true,
    lista: lista,
    pretty: true,
    user: req.user,
  });
  res.end();
};

exports.agregarItem = async function (req, res) {
  // let lista = await Lista.findByPk(req.body.lista);
  console.log(req.body);
  let lista = req.body.list;
  console.log("listaId ", lista);
  if (!lista || lista == 0) {
    lista = null;
  }
 
  await Item.create({
    userId: req.body.userId,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    prioridad: req.body.prioridad,
    estado: req.body.estado,
    fecha_limite: req.body.fecha_limite,
    // createdAt: req.body.fec_crea,
    listId: lista,
  });
  // }
  res.redirect(301, "/item");
};

exports.updateItem = async function (req, res) {
  console.log(req.body.id);
  console.log(req.body.list + " body.list");
  let lista = req.body.list;
  console.log("listaId ", lista);
  if (!lista || lista == 0) {
    lista = null;
  }
  let item = await Item.findByPk(req.body.id);
  console.log(lista);
  item.listId = lista;
  item.estado = req.body.estado;
  item.titulo = req.body.titulo;
  item.descripcion = req.body.descripcion;
  item.prioridad = req.body.prioridad;
  item.estado = req.body.estado;
  item.fecha_limite = req.body.fecha_limite;
  item.fecha_resolucion = req.body.fecha_resolucion;
  item.createdAt = req.body.fec_crea;
  item.updatedAt = new Date();
  await item.save();
  res.redirect(req.get("referer"));
};

exports.deleteItem = async function (req, res) {
  let item = await Item.findByPk(req.body.id);
  await item.destroy();
  res.redirect(301, req.get("referer"));
};
