import { User } from "../models/user.model.ts";
import db from "../database/db.ts";

class UserRepository {
	private entity = "users";

	async findAll(): Promise<User[]> {
		return db<User>(this.entity).select("*");
	}

	async create(user: Partial<User>): Promise<User> {
		return db<User>(this.entity).insert(user);
	}
}

export default UserRepository;
