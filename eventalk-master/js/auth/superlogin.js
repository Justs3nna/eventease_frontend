import { backendURL, successNotification, errorNotification } from "../utils/utils.js";


// Form Login
const form_login = document.getElementById("form_login");

form_login.onsubmit = async (e) => {
    e.preventDefault();

    //Disable Button
    document.querySelector("#form_login button").disabled = true;
    document.querySelector("#form_login button").innerHTML = `<div class="spinner-border me-2" role="status">
                </div>
                <span>Loading...</span>`;

    // Tanggalon ra nato ni pag finalize
    console.log('ma click ang login button');

    // Pagkuha sa Value sa form (input ug select) set it as form-data
    const formData = new FormData(form_login);


    // Fetch API user login endpoint
    const response = await fetch(backendURL + "/api/admin-login", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },                      
        body: formData,
    });

     // Get response if 200-299 status code
     if (response.ok) {
        const json = await response.json();
        // Tanggalon ning console log upon finalization
        console.log(json);

        localStorage.setItem("token", json.token);

        form_login.reset();

        successNotification("Successfully Logged in.", 5);

        window.location.pathname = "/admin-dashboard.html";

        // // Check the user role and redirect accordingly
        // if (json.role === "organizer") {
        //     window.location.pathname = "/organizer-dashboard.html";
        // } //else if (json.role === "administrator") {
        //    // window.location.pathname = "/admin-dashboard.html";
        //  else {
        //     // Handle other roles or unknown roles
        //     console.error("Unknown user role:", json.role);
        // }
}

    // Get response if 422 status code
    else if (response.status == 422) {
        const json = await response.json();

        errorNotification(json.message, 5);
    }

    // Enable Button
    document.querySelector("#form_login button").disabled = false;
    document.querySelector("#form_login button").innerHTML = `Login`;
};
