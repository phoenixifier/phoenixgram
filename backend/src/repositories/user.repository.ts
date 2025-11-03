import { User } from "../models/user.model.ts";
import db from "../database/db.ts";

class UserRepository {
	public userEntity = "users";

	async findAll(): Promise<User[]> {
		return db<User>(this.userEntity).select("*");
	}

	async findById(user_id: number): Promise<any> {
		return db<User>(this.userEntity)
			.select("users.*")
			.count("posts.id AS post_count")
			.from("users")
			.leftOuterJoin("posts", "users.id", "posts.user_id")
			.where("users.id", user_id)
			.groupBy("users.id")
			.first();
	}

	async create(user: Partial<User>): Promise<User> {
		return db<User>(this.userEntity).insert(user);
	}

	async update(user: User, user_id: number): Promise<User> {
		return db<User>(this.userEntity).where("id", user_id).update({
			username: user.username,
			full_name: user.full_name,
			email: user.email,
			password_hash: user.password_hash,
			avatar: user.avatar,
			bio: user.bio,
		});
	}

	async delete(user_id: number): Promise<User> {
		return db<User>(this.userEntity).where("id", user_id).del();
	}
}

export default UserRepository;
