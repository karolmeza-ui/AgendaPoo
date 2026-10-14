import { LoginController } from "../controllers/login-controller.js";

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
    const loginController = new LoginController();
    loginController.logout();
    window.location.href = "../index.html";
});
