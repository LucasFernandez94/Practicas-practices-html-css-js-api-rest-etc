//Nombre del usuario
var username = null;
username = $.cookie('username');
if (username == null) {
    $(location).attr('href', './Login.html')
}

$(document).ready(function() {
    $('#Username').append(username)
});
// Valores para la fecha actual

var date = new Date();
const mes = date.getMonth() + 1;
$(document).ready(function() {
    $('#Date').append(date.getHours() +
        " : " + date.getUTCMinutes() +
        " : " + date.getSeconds()
    )
    $('#Fecha').append(date.getDate() + " / " + mes + " / " + date.getFullYear())

});

//API URI BASE https://rickandmortyapi.com/api/

//URI , end point por personaje id   https://rickandmortyapi.com/api/character/${id}

// Funcion principal

$(function() {
    //cuando se presione click en el input con id "buscar"
    //se invocara a la funcion buscarPersonaje();
    $("#BotonBuscar").click(e => {
        BuscarPersonaje();
    })

    //cuando se presione click en el input con id "limpiar"
    //se invocara a la funcion Limpiar();

    $("#Limpiar").click(e => {
        Limpiar();
    })

    //LLama a la funcion CerrarSecion()

    $("#CerrarSesion").click(e => {
        CerrarSecion();
    })

    //Cuando aprete el boton donde esta el nombre del personaje 
    //se crea la imagen debajo de la tabla

    $("#BName").click(e => {
        var personaje = $("#NavBuscar").val();
        getCard(personaje);
    })

    $(document).keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            BuscarPersonaje();
        }
    });
})

function BuscarPersonaje() {
    //val me trae el valor del input 
    var personaje = $("#NavBuscar").val();
    //hacemos una validacion del id ingresado 

    if (validacion(personaje)) {
        //si cumple la validacion vamos a buscar los datos del personaje al API REST
        getPersonaje(personaje);
        //Ponemos el foco en el nav
        $("#NavBuscar").focus();

    } else {
        $("#mensaje1").fadeIn("slow");
        $("#NavBuscar").val("");
        $("#NavBuscar").focus();
    }

}

//validamos el id que ingresa el usuario
function validacion(personaje) {

    //Valido que el valor ingresado sea un numero3
    if (isNaN(personaje)) {

        $("#mensaje1").fadeIn("slow");
        return false
    } else {
        if (personaje > 671) { //Maximo numero de personajes
            //mostrar mensaje de error
            $("#mensaje2").fadeIn("slow");
            $("#NavBuscar").val(" ");
            $("#NavBuscar").focus();
            validacion(personaje);
            return false
        } else {
            $("#mensaje1").fadeOut("slow");
            $("#mensaje2").fadeOut("slow");
            $("#NavBuscar").focus();
        }

    }
    return true;
}

// Buscar personaje en la api para la tabla
function getPersonaje(personaje) {

    $.ajax({

        type: "GET",
        url: `https://rickandmortyapi.com/api/character/${personaje}`,
        success: function(obj) {
            //imprimir personaje
            $("#table").append(generarPersonaje(obj));
        }

    })

}
// Buscar personaje en la api para la imagen
function getCard(personaje) {
    $.ajax({

        type: "GET",
        url: `https://rickandmortyapi.com/api/character/${personaje}`,
        success: function(obj) {
            //imprimir personaje
            $("#Img").append(generarCard(obj));

        }
    })
}

// Generar tabla con nuevos valores
function generarPersonaje(obj) {

    $('#Id').text(obj.id);
    $('#BName').text(obj.name);
    $('#Status').text(obj.status);
    $('#Species').text(obj.species);
    $('#Type').text(obj.type);
    $('#Gender').text(obj.gender);
}
// Genera la imagen en pantalla

function generarCard(obj) {
    var card = `
    <img src="${obj.image} " class="figure-img img-fluid rounded" alt=" ">
    `
    $("#NavBuscar").val(" ");
    return card;
}

//Boton Cerrar Secion
function CerrarSecion() {
    $.removeCookie("username");
    $(location).attr('href', '/Login.html')
}

function Limpiar() {

    $("#Img").empty(); //borro todas las card 
    //y pongo el foco en el input 
    $("#NavBuscar").focus();
}