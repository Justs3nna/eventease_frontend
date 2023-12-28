import { setRouter } from "../router/router.js";

// Set Router
setRouter();

// Backend URL sa NGROK
const backendURL = "https://62c8-61-245-13-115.ngrok-free.app/eventease-backend/public";

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

getLoggedUser();

async function getLoggedUser() {
    // Access User Profile API Endpoint
    const response = await fetch(backendURL + "/api/organizer/show", {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  
    // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
  
      document.getElementById("user_logged").innerHTML =
        json.email + " ";
  
      if (document.getElementById("organizer_id")) {
        document.getElementById("organizer_id").value = json.id;
      }
    }
    // Get response if 400 or 500 status code
    else {
      const json = await response.json();
  
      errorNotification(json.message, 10);
    }
  }

  getLoggedSuperUser();

async function getLoggedSuperUser() {
    // Access User Profile API Endpoint
    const response = await fetch(backendURL + "/api/admin/show", {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  
    // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
  
      document.getElementById("user_logged").innerHTML =
        json.username + " ";
  
      if (document.getElementById("administrator_id")) {
        document.getElementById("administrator_id").value = json.id;
      }
    }
    // Get response if 400 or 500 status code
    else {
      const json = await response.json();
  
      errorNotification(json.message, 10);
    }
  }

export { getLoggedSuperUser, getLoggedUser, backendURL, successNotification, errorNotification };