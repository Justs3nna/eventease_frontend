import { setRouter } from "../router/router.js";

// Set Router
setRouter();

// Backend URL sa NGROK
const backendURL = "https://8a27-210-1-112-249.ngrok-free.app/eventease-backend/public";

// Notifications
function successNotification(message, seconds = 0) {
    document.querySelector(".alert-success").classList.remove("d-none");
    document.querySelector(".alert-success").classList.add("d-block");
    document.querySelector(".alert-success").innerHTML = message;

    if (seconds != 0){
    setTimeout(function () {
        document.querySelector(".alert-success").classList.remove("d-block");
        document.querySelector(".alert-success").classList.add("d-none");
    }, seconds * 1000);
  }
}

function errorNotification(message, seconds = 0) {
    document.querySelector(".alert-danger").classList.remove("d-none");
    document.querySelector(".alert-danger").classList.add("d-block");
    document.querySelector(".alert-danger").innerHTML = message;

    if (seconds != 0){
    setTimeout(function () {
        document.querySelector(".alert-danger").classList.remove("d-block");
        document.querySelector(".alert-danger").classList.add("d-none");
    }, seconds * 1000);
  }
}

export { backendURL, successNotification, errorNotification };