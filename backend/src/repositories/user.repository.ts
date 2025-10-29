import { User } from "../models/user.model.ts";
import db from "../database/db.ts";

class UserRepository {
	public userEntity = "users";

	async findAll(): Promise<User[]> {
		return db<User>(this.userEntity).select("*");
	}

	async create(user: Partial<User>): Promise<User> {
		return db<User>(this.userEntity).insert(user);
	}

	incrementPostCount(userId: number) {
		return db<User>(this.userEntity)
			.where("id", userId)
			.increment("posts_count", 1);
	}
}

export default UserRepository;
