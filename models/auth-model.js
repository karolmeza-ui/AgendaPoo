export class AuthModel {
    id = Date.now();
    currentUser;
    timeStamp = new Date().toISOString();

    constructor(data = {}) {
        this.currentUser = data.user ?? "";
    }
}
