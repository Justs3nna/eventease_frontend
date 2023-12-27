import { getLoggedSuperUser, backendURL, errorNotification } from "../utils/utils.js";

getLoggedSuperUser();

const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = async () => {
    //alert("ma click siya");

        // Access Logout API endpoint
        const response = await fetch(backendURL + "/api/admin-logout", {
            //gi comment kay on default daw ang GET // refer sa video nalang if maglibog or naay utruhon basa sa notes
            //method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        }); 
    
         // Get response if 200-299 status code
         if (response.ok) {
            
            //clear token sa storage
            localStorage.clear();
            //pwedi nadaw kwaon
            //const json = await response.json();
            //successNotification("Logout Successful.")
            
            // Redirect Page
            window.location.pathname = "/index.html";
            alert("Logout Successful.");
    
            
        }
    
        // Get response if 400 or 500 status code
        else {
            const json = await response.json();
    
            errorNotification(json.message, 10);
        }

};

// Get all data
getDatas();
getLoggedSuperUser();

async function getDatas() {
    // Get API endpoint
    const response = await fetch(backendURL + "/api/eventschedule", {
        headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
        },
    });

    if (response.ok) {
        const json = await response.json();

        let container = "";
        json.forEach((element) =>  {
            const date = new Date(element.created_at).toLocaleString();

            container += `
            <div class="row mb-4 col-md-12">
                <div class="col-md-12">
                    <div class="card">
                        <div class="col-md-12 row card-body">
                            <p class="col-12 card-text">Event Name: ${element.event_name}</p>
                            <p class="col-12 card-text">Description: ${element.event_desc}</p>
                            <p class="col-12 card-text">Venue: ${element.venue_name}</p>
                            <p class="col-12 card-text">Date: ${element.date_sel}</p>
                            <p class="col-12 card-text">Time: ${element.time_sel}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Last updated: ${date}</small>
                            <div class="col-sm-8>
                            <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                            <ul class-"dropdown-menu">
                                <li>
                                    <a class="dropdown-item" href="#" id="btn_edit" data-id="${element.event_id}">Edit</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#" id="btn_delete" data-id="${element.event_id}">Delete</a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>`;
        });

        document.getElementById("getDatas").innerHTML = container;
    } else {
        errorNotification("HTTP-Error: " + response.status);
    }
}

