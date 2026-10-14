import { UserRepository } from "../repositories/user-repository.js";
export class UserService {
    repository;
    constructor() {
        this.repository = new UserRepository();
    }
    getUsers() {
        return this.repository.getUsersByLocalStorage();
    }
    saveUser(user) {
        try {
            const existingUser = this.findUserByEmail(user.email);
            if (existingUser) {
                throw new Error("El usuario ya existe");
            }
            this.repository.saveToLocalStorage(user);
        } catch (error) {
            throw error;
        }
    }
    updateUser(user, id) {
        try {
            const updated = this.repository.updateToLocalStorage(user, id);
            if (!updated) {
                throw new Error("No se pudo actualizar el usuario");
            }
        } catch (error) {
            throw error;
        }
    }
    findUserByEmail(email) {
        const normalizedEmail = String(email ?? "").trim().toLowerCase();
        const user = this.repository.getUsersByLocalStorage().find(
            (item) => (item.email || "").trim().toLowerCase() === normalizedEmail
        );
        return user ?? null;
    }
    findUserById(id) {
        const user = this.repository.getUsersByLocalStorage().find(
            (item) => parseInt(item.id) === parseInt(id)
        );
        return user ?? null;
    }
    deleteUserById(id) {
        this.repository.deleteUserById(id);
    }
    hashPassword(password) {
        // Hash password logic here
    }
}
