import UserRepository from "./user.repository.ts";
import { User } from "../models/user.model.ts";
import db from "../database/db.ts";

class AuthRepository {
	private entity = new UserRepository();

	async findByUsername(username: string): Promise<User | undefined> {
		return db<User>(this.entity.userEntity).where("username", username).first();
	}
}

export default AuthRepository;
