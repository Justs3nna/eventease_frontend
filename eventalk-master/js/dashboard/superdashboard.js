import { backendURL, errorNotification } from "../utils/utils.js";

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

getLoggedUser();

async function getLoggedUser() {
    // Access User Profile API Endpoint
    const response = await fetch(backendURL + "/api/administrator/show", {
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

