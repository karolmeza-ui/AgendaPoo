import { UserModel } from "../models/user-model.js";
import { UserService } from "../services/user-service.js";

export class UserController {
    userService;
    user;
    constructor() {
        this.userService = new UserService();
        this.user = new UserModel();
    }

    saveUser(request) {
        try {
            if (!request.name || !request.email || !request.password) {
                throw new Error("Todos los campos son obligatorios");
            }
            const user = new UserModel(request);
            this.userService.saveUser(user);
        } catch (error) {
            throw error;
        }
    }

    updateUser(request, id) {
        try {
            if (!request.name || !request.email) {
                throw new Error("Todos los campos son obligatorios");
            }
            let user = this.userService.findUserById(id);
            if (request.password.trim() === "") {
                request.password = user.password;
            }

            let updatedUser = new UserModel(request);
            updatedUser.id = user.id;
            this.userService.updateUser(updatedUser, id);
        } catch (error) {
            throw error;
        }
    }

    deleteUserById(id) {
        try {
            this.userService.deleteUserById(id);
        } catch (error) {
            throw error;
        }
    }

    getUsers() {
        return this.userService.getUsers();
    }

    findUserById(id) {
        return this.userService.findUserById(id);
    }
}
