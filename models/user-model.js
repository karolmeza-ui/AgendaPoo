export class UserModel {
    id = Date.now();
    name;
    email;
    password;
    active = true;

    constructor(data = {}) {
        this.id = data.id ?? this.id;
        this.name = data.name ?? "";
        this.email = data.email ?? "";
        this.password = data.password ?? "";
        this.active = data.active ?? true;
    }

    getStatus() {
        return this.active === true ? "Active" : "Inactive";
    }
}
