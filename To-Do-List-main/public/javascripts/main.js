///PARA NO PODER NAVEGAR EN EL CACHE DEL NAVEGADOR UNA VEZ QUE SE HACE EL LOGOUT
if (window.history.replaceState) {
  // verificamos disponibilidad
  window.history.replaceState(null, null, window.location.href);
}
///Parte de tareas
$(document).ready(function () {
  tablaPersonas = $("#tablaItems").DataTable({
    order: [[5, "desc"]],

    //Para cambiar el lenguaje a español
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      infoFiltered: "(filtrado de un total de _MAX_ registros)",
      sSearch: "Buscar:",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
      sProcessing: "Procesando...",
    },
  });

  var fila; //capturar la fila para editar o borrar el registro

  //botón EDITAR
  $(document).on("click", "#btnEditar", function () {
    fila = $(this).closest("tr");
    id = parseInt(fila.find("td:eq(0)").text());
    titulo = fila.find("td:eq(1)").text();
    descripcion = fila.find("td:eq(2)").text();
    estado = fila.find("td:eq(3)").text();
    prioridad = fila.find("td:eq(4)").text();
    fecha_creacion = fila.find("td:eq(5)").text();
    fecha_limite = fila.find("td:eq(6)").text();
    fecha_resolucion = fila.find("td:eq(7)").text();
    lista_titulo = fila.find("td:eq(8)").text();
    listId = fila.find("td:eq(9)").text();

    let arrFecCrea = fecha_creacion.split("/");
    let arrLim = fecha_limite.split("/");
    console.log(listId);
    // RELLENO DE FORM EN EL MODAL

    $("#id").val(id);
    $("#titulo").val(titulo);
    $("#descripcion").val(descripcion);
    $("#lista1").val(lista_titulo);

    if (!listId || listId == 0) {
      listId = null;
      lista_titulo = "-- ninguna -- ";

      $("#lista")
        .attr({
          value: "0",
          // selected: "selected",
        })
        .html(lista_titulo);
      console.log("if lista id=" + listId);
    } else {
      console.log("en el else lista id= " + listId);
      $("#lista")
        .attr({
          value: listId,
          // selected: "selected",
        })
        .html(lista_titulo);
    }
    $("#fecha_creacion").attr({
      value: arrFecCrea[2] + "-" + arrFecCrea[1] + "-" + arrFecCrea[0],
      type: "date",
      disabled: "disabled",
    });

    $("#fecha_limite").attr({
      value: arrLim[2] + "-" + arrLim[1] + "-" + arrLim[0],
      type: "date",
      // disabled: "disabled",
    });
    $("#prioridad").val(prioridad);
    $("#estado").val(estado);

    if (fecha_resolucion != "No se ingreso fecha de resolucion") {
      let arrFec_res = fecha_resolucion.split("/");
      $("#fecha_resolucion").attr({
        value: arrFec_res[2] + "-" + arrFec_res[1] + "-" + arrFec_res[0],
        type: "date",
        // disabled: "disabled",
      });
      console.log("if");
    } else {
      console.log("else");
      let now = new Date();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      let today = now.getFullYear() + "-" + month + "-" + day;
      $("#fecha_resolucion").attr({
        value: today,
        type: "date",
        min: today,
      });
      // } //FIN ELSE  PARA TODOS LOS ITEMS QUE NO ESTAN RESUELTOS
    }
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar");
    $("#btnModal")
      .attr({
        class: "btn btn-primary",
        type: "submit",
        formaction: "../item/updateItem",
      })
      .html("Guardar cambios");
    $("#myModal").modal("show");
  });

  // //botón BORRAR
  $(document).on("click", "#btnBorrar", function () {
    fila = $(this).closest("tr");
    console.log("fila:  " + JSON.stringify(fila));
    id = parseInt(fila.find("td:eq(0)").text());
    titulo = fila.find("td:eq(1)").text();
    descripcion = fila.find("td:eq(2)").text();
    estado = fila.find("td:eq(3)").text();
    prioridad = fila.find("td:eq(4)").text();
    fecha_creacion = fila.find("td:eq(5)").text();
    fecha_limite = fila.find("td:eq(6)").text();
    fecha_resolucion = fila.find("td:eq(7)").text();
    lista_titulo = fila.find("td:eq(8)").text();
    listId = fila.find("td:eq(9)").text();

    let arr = fecha_creacion.split("/");
    let dia = arr[0];
    let mes = arr[1];
    let año = arr[2];
    console.log(año + "/" + mes + "/" + dia);
    let arrLim = fecha_limite.split("/");
    let arrFecRes = fecha_resolucion.split("/");
    console.log(fecha_creacion);

    $("#idb").val(id);
    $("#titulob").attr({ value: titulo, disabled: "disabled" });

    $("#descripcionb").attr({ value: descripcion, disabled: "disabled" });
    if (!listId || listId == 0) {
      listId = null;
      lista_titulo = "-- ninguna -- ";

      $("#listab").val(lista_titulo);
    } else {
      console.log("en el else lista id= " + listId);
      $("#listab").val(lista_titulo);
    }
    $("#fecha_creacionb").attr({
      value: año + "-" + mes + "-" + dia,
      type: "date",
      disabled: "disabled",
    });

    $("#fecha_limiteb").attr({
      value: arrLim[2] + "-" + arrLim[1] + "-" + arrLim[0],
      type: "date",
      disabled: "disabled",
    });
    $("#prioridadb").val(prioridad);
    $("#estadob").val(estado);

    if (fecha_resolucion != "No se ingreso fecha de resolucion") {
      $("#fecha_resolucionb").val(fecha_resolucion);
    } else {
      $("#fecha_resolucionb").val("No se ingreso fecha de resolucion");
    }

    $(".modal-header").css("background-color", "#F3370D");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Borrar");
    $("#btnModalBorrar")
      .attr({
        class: "btn btn-danger",
        type: "submit",
        formaction: "../item/deleteItem",
      })
      .html("Borrar");
    $("#ModalBorrar").modal("show");
  });

  // FIN JQUERY
});

///Parte de Listas
$(document).ready(function () {
  tablaListas = $("#tablaListas").DataTable({
    order: [[5, "desc"]],

    //Para cambiar el lenguaje a español
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      infoFiltered: "(filtrado de un total de _MAX_ registros)",
      sSearch: "Buscar:",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
      sProcessing: "Procesando...",
    },
  });

  var fila; //capturar la fila para editar o borrar el registro

  //botón EDITAR
  $(document).on("click", "#btnEditarLista", function () {
    fila = $(this).closest("tr");
    id = parseInt(fila.find("td:eq(0)").text());
    titulo = fila.find("td:eq(1)").text();
    estado = fila.find("td:eq(2)").text();
    categoria_titulo = fila.find("td:eq(3)").text();
    categoriaId = fila.find("td:eq(4)").text();
    fecha_creacion = fila.find("td:eq(5)").text();
    fecha_resolucion = fila.find("td:eq(6)").text();

    let arrFecCrea = fecha_creacion.split("/");

    // RELLENO DE FORM EN EL MODAL

    $("#id").val(id);
    $("#titulo").val(titulo);
    // $("#categoria_titulo").val(categoria_titulo);
    // $("#categoriaId").val(categoriaId);
    if (!categoriaId || categoriaId == 0) {
      categoriaId = null;
      categoria_titulo = "-- ninguna -- ";

      $("#categoria")
        .attr({
          value: "0",
          // selected: "selected",
        })
        .html(categoria_titulo);
      console.log("if categoriaId" + categoriaId);
    } else {
      console.log(
        "en el else categoriaId= " +
          categoriaId +
          " titulo -" +
          categoria_titulo
      );
      $("#categoria")
        .attr({
          value: categoriaId,
          // selected: "selected",
        })
        .html(categoria_titulo);
    }

    $("#fecha_creacion").attr({
      value: arrFecCrea[2] + "-" + arrFecCrea[1] + "-" + arrFecCrea[0],
      type: "date",
      disabled: "disabled",
    });
    $("#estado").val(estado);
    if (fecha_resolucion != "No se ingreso fecha de resolucion") {
      let arrFec_res = fecha_resolucion.split("/");
      $("#fecha_resolucion").attr({
        value: arrFec_res[2] + "-" + arrFec_res[1] + "-" + arrFec_res[0],
        type: "date",
        // disabled: "disabled",
      });
      console.log("if");
    } else {
      console.log("else");
      let now = new Date();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      let today = now.getFullYear() + "-" + month + "-" + day;
      $("#fecha_resolucion").attr({
        value: today,
        type: "date",
        min: today,
      });
      // } //FIN ELSE  PARA TODOS LOS ITEMS QUE NO ESTAN RESUELTOS
    }
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar");
    $("#btnModalLista")
      .attr({
        class: "btn btn-primary",
        type: "submit",
        formaction: "../lista/updateLista",
      })
      .html("Guardar cambios");
    $("#modalLista").modal("show");
  });

  // //botón BORRAR
  $(document).on("click", "#btnBorrarLista", function () {
    fila = $(this).closest("tr");
    console.log("fila:  " + JSON.stringify(fila));
    id = parseInt(fila.find("td:eq(0)").text());
    titulo = fila.find("td:eq(1)").text();
    estado = fila.find("td:eq(2)").text();
    categoria_titulo = fila.find("td:eq(3)").text();
    categoriaId = fila.find("td:eq(4)").text();
    fecha_creacion = fila.find("td:eq(5)").text();
    fecha_resolucion = fila.find("td:eq(6)").text();

    let arr = fecha_creacion.split("/");
    let dia = arr[0];
    let mes = arr[1];
    let año = arr[2];
    console.log(año + "/" + mes + "/" + dia);
    console.log(fecha_creacion);

    $("#idb").val(id);
    // $("#titulo").val("");
    $("#titulob").attr({ value: titulo, disabled: "disabled" });
    $("#categoria_titulob").val(categoria_titulo);
    $("#categoriaIdb").val(categoriaId);
    $("#fecha_creacionb").attr({
      value: dia + "-" + mes + "-" + año,
      type: "text",
      disabled: "disabled",
    });
    $("#estadob").val(estado);
    // alert(fecha_resolucion);
    if (fecha_resolucion != "No se ingreso fecha de resolucion") {
      $("#fecha_resolucionb").val(fecha_resolucion);
      console.log("if");
    } else {
      $("#fecha_resolucionb").val("No se ingreso fecha de resolucion");
    }

    $(".modal-header").css("background-color", "#F3370D");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Borrar");
    $("#btnModalListaBorrar")
      .attr({
        class: "btn btn-danger",
        type: "submit",
        formaction: "../lista/deleteLista",
      })
      .html("Borrar");
    $("#modalListaBorrar").modal("show");
  });

  // FIN JQUERY
});

$(document).ready(function () {
  tablaCategorias = $("#tablaCategorias").DataTable({
    order: [[2, "desc"]],

    //Para cambiar el lenguaje a español
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      infoFiltered: "(filtrado de un total de _MAX_ registros)",
      sSearch: "Buscar:",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
      sProcessing: "Procesando...",
    },
  });
  // FIN JQUERY CATEGORIAS
});
