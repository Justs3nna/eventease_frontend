function setRouter() {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // Assuming you store the user's role in local storage

    alert(window.location.pathname);

    switch (window.location.pathname) {
        case "/login.html":
            if (token) {
                // Check the user's role and redirect accordingly
                if (role === "organizer") {
                    window.location.pathname = '/organizer-dashboard.html';
                } else if (role === "admin") {
                    window.location.pathname = '/admin-dashboard.html';
                } else {
                    // Handle other roles or unknown roles
                    console.error("Unknown user role:", userRole);
                }
            }
            break;
        case "/organizer-dashboard.html":
        case "/admin-dashboard.html":
        //case "/eventcreate.html":
        //case "/pending-requests.html":
            if (localStorage.getItem("token") == null) {
                window.location.pathname = "/index.html";
            }
            break;

        default:
            break;
    }
}

export { setRouter };
