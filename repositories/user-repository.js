import { LocalStorage } from "../persistence/local-storage.js";

export class UserRepository {
    localStorage;
    localStorageKey = "users";
    constructor() {
        this.localStorage = new LocalStorage();
    }

    saveToLocalStorage(user) {
        const users = [...this.getUsersByLocalStorage(), user];
        this.localStorage.setItem(this.localStorageKey, users);
    }

    updateToLocalStorage(user, id = user.id) {
        const users = this.getUsersByLocalStorage();
        const userIndex = users.findIndex((item) => String(item.id) === String(id));
        if (userIndex === -1) {
            return false;
        }

        users[userIndex] = { ...user, id: users[userIndex].id };
        this.localStorage.setItem(this.localStorageKey, users);
        return true;
    }

    getUsersByLocalStorage() {
        const currentUsers = this.localStorage.getItem(this.localStorageKey);
        return currentUsers ?? [];
    }

    deleteUserById(id) {
        const users = this.getUsersByLocalStorage();
        const updatedUsers = users.filter((user) => String(user.id) !== String(id));
        this.localStorage.setItem(this.localStorageKey, updatedUsers);
    }
}
