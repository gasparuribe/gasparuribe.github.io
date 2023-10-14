var ver = 1;
function backend_post(formData) {
    $.ajax({
        type: "POST",
        url: "https://2wcjrzyccdfksj3b73afrzcpw40uryhg.lambda-url.us-east-2.on.aws?action=prueba", // Replace with your actual server-side endpoint
        data: formData,
        success: function (response) {
            // Handle the response from the server here.
            console.log("Login successful: " + JSON.stringify(response));
            // You can redirect the user or perform other actions based on the response.
        },
        error: function (error) {
            // Handle errors here.
            console.error("Login error: " + error);
        }
    });
}
function login_try(formData) {
    console.log(formData);
    backend_post(formData);
    /*
    if(username=="asdasd"){
        var horasExpCookie = 3;
        if (rememberMe) {
            horasExpCookie = 24 * 31;//1 mes
        }
        setSecureCookie("ui", username, horasExpCookie);
        return true;
    }
    */
    removeCookie("ui");
    return false;
}
function logout() {
    //localStorage.removeItem("ui");
    removeCookie("ui");
    window.location.href = 'index.html';
}
function getCookie(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null; // Cookie not found
}
function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
function setSecureCookie(name, value, hoursToExpire) {
    const now = new Date();
    const expiration = new Date(now.getTime() + hoursToExpire * 60 * 60 * 1000); // Calculate expiration time
    const expires = expiration.toUTCString();// Convert the expiration date to a UTC string format
    // Flags for security: secure (requires HTTPS) and httpOnly (prevents client-side scripts from accessing the cookie)
    const secureFlag = " secure;";
    const httpOnlyFlag = ""; //" HttpOnly;"; Aqui voy!!
    const mypath = " path=/";
    document.cookie = `${name}=${value}; expires=${expires};${secureFlag}${httpOnlyFlag}${mypath}`;
}
console.info("script.js - Funciones cargadas v:"+ver);
/* Aqui ya se cargaron todas las funciones y comienza lo ejecutable.
Aqui voy!!!
1. consultar a BACKEND (aws lambda) un nonce_token
2. encriptar el usuario sin el nonce
3. Encriptar el usuario con el nonce
4. Enviar el usuarioa BACKEND y esperar respuesta
*/
/* AUTH Redirige de ser necesario */
const currentPageURL = window.location.href;
var currentPagePath = window.location.pathname;
/* El siguiente codigo es para compatibilizar con mi carpeta local */
var localHostFix = "/ga.git.io";
if (currentPagePath.indexOf(localHostFix) !== -1) {
    currentPagePath = currentPagePath.replace(localHostFix, "");
} else {
    localHostFix = "";
}
const getUserIdentifier = getCookie("ui");
//Aqui voy - verificar que ui aun es valido
//localStorage.removeItem("ui");
if (!getUserIdentifier) {
    if (currentPagePath !== '/index.html' && currentPagePath !== '/index' && currentPagePath !== '/') {
        window.location.href = localHostFix + '/index.html';
    } else {
        /*Aqui voy - Cargar login en body en vez de harcoded en index.html*/
    }
} else {
    /* Aqui voy - Cargar contenido en body en vez del siguiente codigo*/
    if (currentPagePath !== '/dashboard.html') {
        window.location.href = localHostFix+'/dashboard.html';
    }
}
