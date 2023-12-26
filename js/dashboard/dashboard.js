import { backendURL, errorNotification } from "../utils/utils.js";

const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = async () => {
    //alert("ma click siya");

        // Access Logout API endpoint
        const response = await fetch(backendURL + "/api/logout", {
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



// Get all data
getDatas();

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

            container += 
            `<div class="row" id="getDatas">
              <div class="col-md-12">
                  <div class="event-list">
                    <p>Event ID: ${element.event_id}</p>
                <p>Date: ${element.date_sel}</p>
                <p>Time: ${element.time_sel}</p>
                <hr>
                  </div>
              </div>
          </div>`
        });

        document.getElementById("getDatas").innerHTML = container;
    } else {
        errorNotification("HTTP-Error: " + response.status);
    }
}
