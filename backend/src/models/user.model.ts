export type User = {
	id?: number;
	username: string;
	full_name: string;
	email: string;
	password_hash: string;
	avatar?: string;
	bio?: string;
	following_count?: number;
	followers_count?: number;
	posts_count?: number;
	created_at?: Date;
	updated_at?: Date;
};
