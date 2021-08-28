// Api uri base https://jsonplaceholder.typicode.com/users 

//Expresión para validar un correo electrónico
var expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

$(function() {
        //función click

        $("#validar_formulario").click(function() {

            //Variables
            var email = $("#email").val();
            var password = $("#password").val();
            $("#mensaje1").fadeOut("slow");
            $("#mensaje2").fadeOut("slow");
            //Validaciones anidadas
            if (email == "") {
                $("#mensaje1").fadeIn("slow");
                $("#email").val("");
                $("#email").focus();

                return false;
            } else {
                if (!expr.test(email)) {
                    $("#mensaje1").fadeIn("slow");
                    $("#email").val("");
                    $("#email").focus();

                    return false;
                } else {
                    if (password == "") {
                        $("#mensaje2").fadeIn("slow");
                        $("#password").val("");
                        $("#password").focus();

                        return false;
                    } else {
                        if (!validacionClave(password)) {
                            $("#mensaje2").fadeIn("slow");
                            $("#password").val("");
                            $("#password").focus();
                            return false;

                        } else {
                            Buscar(email, password)
                        }
                    }

                }
            }

        }); //click
    }) // funcion

var intentos = 0;

function Buscar(email, password) {

    $.ajax({

        type: "GET",
        url: `https://jsonplaceholder.typicode.com/users`,
        success: function(responseAPI) {
            Encontrar(responseAPI, email, password);

        }
    })
}

function Encontrar(responseAPI, email, password) {
    for (var i = 0; i < responseAPI.length; i += 1) {
        if (email.toLowerCase() == responseAPI[i].email.toLowerCase() && password == responseAPI[i].id) {
            validUser = true;
            trasferUser = responseAPI[i].name
            break;

        } else {
            if (email.toLowerCase() == responseAPI[i].email.toLowerCase() && password != responseAPI[i].id) {
                intentos++;
                $("#mensaje2").fadeIn("slow");
                $("#email").val("");
                $("#password").val("");

            } else {
                validUser = false;
            }

        }
    }
    // Direcciona si encuentra los valores en la api
    if (validUser == true) {
        $.cookie('username', trasferUser);
        Direcionar();
    } else {
        // Borra el formulario cuando el usuario falle 3 intetos
        if (validUser == false && intentos > 3) {

            $("form").remove(".formulario");
            alert("Usuario Bloqueado");
        }
    }
}
// Validacion pedida

function validacionClave(id) {
    var expresionRegular = /^\d{1,2}$/;
    if (!expresionRegular.test(id)) {
        //retorno falso si la clave es invalida
        return false;
    }
    //retorno verdadero si la clave es valida
    return true;
}


function Direcionar() {
    window.location.href = './Index/index.html';
}