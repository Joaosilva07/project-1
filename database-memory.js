import { randomUUID } from "node:crypto";

export default class DatabaseMemory {
    #users = new Map();

    list(search) {
        return Array.from(this.#users.entries())
            .map((userArray) => {
                const id = userArray[0];
                const data = userArray[1];

                return {
                    id,
                    ...data
                };
            })
            .filter(user => {
                if (search) {
                    return user.login.includes(search);
                }
                return true;
            });
    }

    create(user) {
        const userId = randomUUID();
        this.#users.set(userId, user);
    }

    update(id, user) {
        this.#users.set(id, user);
    }

    delete(id) {
        if (this.#users.has(id)) {
            this.#users.delete(id);
        } else {
            throw new Error("User not found");
        }
    }
}
