import { UserController } from "../controllers/user-controller.js";
import { LoginController } from "../controllers/login-controller.js";

document.addEventListener("DOMContentLoaded", function () {
    const userRegistrationForm = document.getElementById("user-registration-form");
    const userLoginForm = document.getElementById("user-login-form");
    const userController = new UserController();
    const loginController = new LoginController();

    userRegistrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const request = {
            name: userRegistrationForm.elements.namedItem("name").value.trim(),
            email: userRegistrationForm.elements.namedItem("email").value.trim(),
            password: userRegistrationForm.elements.namedItem("password").value
        };
        try {
            if (!request.name || !request.email || !request.password) {
                alert("Los campos de nombre, correo electrónico y contraseña son obligatorios.");
                return;
            }

            userController.saveUser(request);
            alert("Usuario registrado exitosamente");
        } catch (error) {
            alert(error.message || error);
        }
        userRegistrationForm.reset();
    });

    userLoginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const request = {
            email: userLoginForm.elements.namedItem("email").value.trim(),
            password: userLoginForm.elements.namedItem("password").value
        };
        try {
            const user = loginController.login(request);
            alert("Inicio de sesión exitoso");
            window.location.href = "../views/users-admin.html"; // Redirige a la página de dashboard
        } catch (error) {
            alert(error.message || error);
        }
    });
});
