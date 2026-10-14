import { LoginService } from "../services/login-service.js";
export class LoginController {
    loginService;

    constructor() {
        this.loginService = new LoginService();
    }

    login(request) {
        try {
            if (!request.email || !request.password) {
                throw new Error("Todos los campos son obligatorios");
            }
            const user = this.loginService.login(request.email, request.password);
            return user;
        } catch (error) {
            throw error;
        }
    }

    logout() {
        this.loginService.logout();
    }
}
