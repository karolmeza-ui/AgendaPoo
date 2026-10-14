import { UserService } from "./user-service.js";
import { LocalStorage } from "../persistence/local-storage.js";

export class LoginService {
    userService;
    localStorage;

    constructor() {
        this.userService = new UserService();
        this.localStorage = new LocalStorage();
    }

    login(email, password) {
        const user = this.userService.findUserByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== password) {
            throw new Error("Invalid password");
        }

        this.localStorage.setItem("currentUser", user);
        return user;
    }

    logout() {
        this.localStorage.removeItem("currentUser");
    }
}
