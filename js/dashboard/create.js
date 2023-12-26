import { backendURL, errorNotification, successNotification } from "../utils/utils.js";

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

const eventForm = document.getElementById("event_req");

    eventForm.addEventListener("submit", async function (e) {
      e.preventDefault();


      // Validate and format time_sel
      const timeInput = eventForm.querySelector("#startTime");
      const enteredTime = timeInput.value.trim();

      // Use a regular expression to check if the entered time matches the format "H:i A"
      const timeFormatRegex = /^\s*(0?[1-9]|1[0-2]):[0-5][0-9] ?(?:[APap][Mm])?\s*$/;

      if (!timeFormatRegex.test(enteredTime)) {
        alert("Invalid time format. Please use the format H:i A (e.g., 12:30 PM).");
        return;
      }

      const formData = new FormData(eventForm);

      try {
        const response = await fetch(backendURL + "/api/event", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          body: formData,
        });

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          // Handle success, if needed
          eventForm.reset();

          successNotification("Request successfully sent.", 5);
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          errorNotification("Venue or Resource is not available", 5);
          // Handle error, if needed
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle unexpected errors, if needed
      }
    });
