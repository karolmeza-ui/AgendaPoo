import bcrypt from "https://cdn.jsdelivr.net/npm/bcryptjs@3.0.2/+esm";

export class PasswordHasher {

    async hash(password) {
        return await bcrypt.hash(password, 10);
    }

    async compare(password, hash) {
        return await bcrypt.compare(password, hash);
    }

}